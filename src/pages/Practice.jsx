import { useState, useMemo, useEffect, useRef } from 'react'
import { VERB_BANK, TENSES, SUBJECTS } from '../data/verbs_es'

// Packs shown in the UI
const PACKS = [
  { id: 'top10', label: 'Top 10' },
  { id: 'top50', label: 'Top 50' },
  { id: 'gcse', label: 'AQA GCSE' },
]

// ---------- Helpers ----------
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function normalise(s) {
  return (s || '').trim().toLowerCase()
}

export default function Practice() {
  // --- Shared filters (apply to both modes) ---
  const [regularity, setRegularity] = useState('both')            // 'both' | 'regular' | 'irregular'
  const [selectedPacks, setSelectedPacks] = useState([])          // empty = all
  const [selectedTenses, setSelectedTenses] = useState(['presente'])
  const [selectedPersons, setSelectedPersons] = useState(['yo'])

  // --- Mode toggle ---
  const [teacherMode, setTeacherMode] = useState(false)

  // --- Current question (shared) ---
  const [current, setCurrent] = useState(null) // {verb, tense, personIndex, correct}
  const [answer, setAnswer] = useState('')

  // --- Student mode state ---
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState({ correct: 0, attempts: 0 })

  // --- Teacher mode state ---
  const [teacherSeconds, setTeacherSeconds] = useState(15) // 10..30
  const [countdown, setCountdown] = useState(null)         // null = not running
  const [revealed, setRevealed] = useState(false)
  const timerRef = useRef(null)

  // ---------- Filter verbs according to settings ----------
  const filteredVerbs = useMemo(() => {
    return VERB_BANK.filter(v => {
      if (regularity === 'regular' && !v.regular) return false
      if (regularity === 'irregular' && v.regular) return false
      if (selectedPacks.length && !v.packs.some(p => selectedPacks.includes(p))) return false
      return true
    })
  }, [regularity, selectedPacks])

  // ---------- Build a new question ----------
  function buildQuestion() {
    if (!filteredVerbs.length || !selectedTenses.length || !selectedPersons.length) return null
    const verb = pick(filteredVerbs)
    const tense = pick(selectedTenses)
    const personIndex = SUBJECTS.indexOf(pick(selectedPersons))
    const correct = verb.tenses[tense]?.[personIndex] || ''
    return { verb, tense, personIndex, correct }
  }

  function newQuestionStudent() {
    const q = buildQuestion()
    setCurrent(q)
    setAnswer('')
    setFeedback('')
  }

  function newQuestionTeacher() {
    stopCountdown()
    const q = buildQuestion()
    setCurrent(q)
    setRevealed(false)
    // start fresh countdown
    if (q) {
      setCountdown(teacherSeconds)
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev === null) return null
          if (prev <= 1) {
            clearInterval(timerRef.current)
            timerRef.current = null
            return 0 // stop at zero; teacher will click "Show Answer"
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setCountdown(null)
    }
  }

  function stopCountdown() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Clean up timer on unmount or when switching modes
  useEffect(() => () => stopCountdown(), [])
  useEffect(() => {
    // When switching modes, reset teacher bits
    stopCountdown()
    setCountdown(null)
    setRevealed(false)
    setFeedback('')
  }, [teacherMode])

  // ---------- Student mode: check + auto next ----------
  function checkAnswer() {
    if (!current) return
    const isCorrect = normalise(answer) === normalise(current.correct)
    setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect. Correct: ${current.correct}`)
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), attempts: prev.attempts + 1 }))
    // next question in 1s
    setTimeout(() => newQuestionStudent(), 1000)
  }

  // Enter key = check (student mode only)
  useEffect(() => {
    const onKey = e => {
      if (!teacherMode && e.key === 'Enter') {
        e.preventDefault()
        if (answer.trim() !== '') checkAnswer()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [teacherMode, answer, current])

  function resetScore() {
    setScore({ correct: 0, attempts: 0 })
    setFeedback('')
    setAnswer('')
    newQuestionStudent()
  }

  // ---------- UI ----------
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Spanish Verb Practice</h1>

        {/* Mode toggle */}
        <label className="ml-auto flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={teacherMode}
            onChange={() => setTeacherMode(v => !v)}
          />
          Teacher Mode
        </label>
      </div>

      {/* Filters */}
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold">Verb Type</label>
          <select
            value={regularity}
            onChange={e => setRegularity(e.target.value)}
            className="border p-2 rounded mt-1 w-full"
          >
            <option value="both">Both</option>
            <option value="regular">Regular only</option>
            <option value="irregular">Irregular only</option>
          </select>

          <label className="block font-semibold mt-4">Verb Packs</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {PACKS.map(p => (
              <label key={p.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPacks.includes(p.id)}
                  onChange={() =>
                    setSelectedPacks(prev =>
                      prev.includes(p.id)
                        ? prev.filter(x => x !== p.id)
                        : [...prev, p.id]
                    )
                  }
                />
                {p.label}
              </label>
            ))}
            <button
              onClick={() => setSelectedPacks([])}
              className="ml-2 text-sm text-blue-600 underline"
            >
              Clear
            </button>
          </div>
        </div>

        <div>
          <label className="block font-semibold">Tenses</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {TENSES.map(t => (
              <label key={t} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTenses.includes(t)}
                  onChange={() =>
                    setSelectedTenses(prev =>
                      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
                    )
                  }
                />
                {t}
              </label>
            ))}
          </div>

          <label className="block font-semibold mt-4">Persons</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {SUBJECTS.map(p => (
              <label key={p} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPersons.includes(p)}
                  onChange={() =>
                    setSelectedPersons(prev =>
                      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
                    )
                  }
                />
                {p}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher controls */}
      {teacherMode && (
        <div className="mt-6 rounded-xl border p-4 bg-gray-50">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="font-semibold">Countdown (s):</div>
            <input
              type="range"
              min={10}
              max={30}
              step={1}
              value={teacherSeconds}
              onChange={e => setTeacherSeconds(parseInt(e.target.value, 10))}
            />
            <div className="w-10 text-center">{teacherSeconds}</div>

            <button
              onClick={newQuestionTeacher}
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded"
            >
              New Question
            </button>
            <button
              onClick={() => setRevealed(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
              disabled={!current || revealed}
            >
              Show Answer
            </button>
            <button
              onClick={newQuestionTeacher}
              className="bg-gray-700 text-white px-4 py-2 rounded"
              disabled={!current}
            >
              Next Question
            </button>
          </div>

          {/* Question display */}
          <div className="mt-4">
            {current ? (
              <>
                {/* Small, normal countdown numbers */}
                {countdown !== null && (
                  <div className="text-xl font-semibold text-gray-700">{countdown}</div>
                )}

                <div className="mt-2 text-gray-700">
                  <div className="text-sm mb-1">
                    Tense: <span className="font-medium">{current.tense}</span>
                  </div>
                  <div className="text-sm mb-1">
                    Verb: <span className="font-medium">{current.verb.infinitive}</span>
                  </div>
                  <div className="text-sm">
                    Subject: <span className="font-medium">{SUBJECTS[current.personIndex]}</span>
                  </div>
                </div>

                {/* BIG answer when revealed */}
                {revealed && (
                  <div className="mt-4 text-center">
                    <div className="text-5xl font-extrabold">{current.correct}</div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 italic">Click “New Question” to begin.</div>
            )}
          </div>
        </div>
      )}

      {/* Student controls */}
      {!teacherMode && (
        <div className="mt-6">
          <div className="flex gap-3">
            <button
              onClick={newQuestionStudent}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              New Question
            </button>
            <button
              onClick={checkAnswer}
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={!current || !answer.trim()}
            >
              Check
            </button>
            <button
              onClick={resetScore}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Reset Score
            </button>
          </div>

          {/* Question */}
          {current && (
            <div className="mt-6 border-t pt-4">
              <h2 className="font-semibold text-lg mb-2">
                🟢 Tense: <span className="font-normal">{current.tense}</span> | 
                Verb: <span className="font-normal">{current.verb.infinitive}</span> | 
                Pack: <span className="font-normal">
                  {current.verb.packs.includes('gcse')
                    ? 'GCSE'
                    : current.verb.packs.includes('top10')
                    ? 'Top 10'
                    : current.verb.packs.includes('top50')
                    ? 'Top 50'
                    : '—'}
                </span>
              </h2>

              <p className="text-md mb-3">
                Subject: <strong>{SUBJECTS[current.personIndex]}</strong>
              </p>

              <input
                className="border p-2 rounded w-full"
                placeholder="Type your answer and press Enter..."
                value={answer}
                onChange={e => setAnswer(e.target.value)}
              />

              {feedback && <p className="mt-3 font-semibold">{feedback}</p>}
            </div>
          )}

          {/* Score Tracker */}
          <div className="mt-8 border-t pt-4 text-lg font-semibold">
            Score: {score.correct} / {score.attempts}{' '}
            {score.attempts > 0 && (
              <span className="text-gray-500 text-sm ml-2">
                ({Math.round((score.correct / score.attempts) * 100)}%)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
