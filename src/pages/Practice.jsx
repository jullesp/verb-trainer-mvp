import { useState, useMemo, useEffect } from 'react'
import { VERB_BANK, TENSES, SUBJECTS } from '../data/verbs_es'

const PACKS = [
  { id: 'top10', label: 'Top 10' },
  { id: 'top50', label: 'Top 50' },
  { id: 'gcse', label: 'AQA GCSE' },
]

export default function Practice() {
  const [selectedTenses, setSelectedTenses] = useState(['presente'])
  const [regularity, setRegularity] = useState('both')
  const [selectedPacks, setSelectedPacks] = useState([])
  const [selectedPersons, setSelectedPersons] = useState(['yo'])
  const [current, setCurrent] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState({ correct: 0, attempts: 0 })

  // Filter verbs by settings
  const filteredVerbs = useMemo(() => {
    return VERB_BANK.filter(v => {
      if (regularity === 'regular' && !v.regular) return false
      if (regularity === 'irregular' && v.regular) return false
      if (selectedPacks.length && !v.packs.some(p => selectedPacks.includes(p))) return false
      return true
    })
  }, [regularity, selectedPacks])

  function newQuestion() {
    if (filteredVerbs.length === 0) {
      setCurrent(null)
      return
    }
    const verb = filteredVerbs[Math.floor(Math.random() * filteredVerbs.length)]
    const tense = selectedTenses[Math.floor(Math.random() * selectedTenses.length)]
    const personIndex = SUBJECTS.indexOf(selectedPersons[Math.floor(Math.random() * selectedPersons.length)])
    const correct = verb.tenses[tense]?.[personIndex] || ''
    setCurrent({ verb, tense, personIndex, correct })
    setAnswer('')
    setFeedback('')
  }

  function checkAnswer() {
    if (!current) return
    const correctForm = current.correct.trim().toLowerCase()
    const given = answer.trim().toLowerCase()
    const isCorrect = given === correctForm
    setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect. Correct: ${correctForm}`)
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), attempts: prev.attempts + 1 }))

    // Move to next question automatically after 1s
    setTimeout(() => {
      newQuestion()
    }, 1000)
  }

  // Handle Enter key
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (answer.trim() !== '') {
          checkAnswer()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  function resetScore() {
    setScore({ correct: 0, attempts: 0 })
    setFeedback('')
    setAnswer('')
    newQuestion()
  }

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Spanish Verb Practice</h1>

      {/* Regularity */}
      <label className="block font-semibold mt-3">Verb Type</label>
      <select
        value={regularity}
        onChange={e => setRegularity(e.target.value)}
        className="border p-2 rounded mt-1"
      >
        <option value="both">Both</option>
        <option value="regular">Regular only</option>
        <option value="irregular">Irregular only</option>
      </select>

      {/* Packs */}
      <label className="block font-semibold mt-4">Verb Packs</label>
      <div className="flex flex-wrap gap-3 mt-2">
        {PACKS.map(p => (
          <label key={p.id} className="flex items-center gap-1">
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
          className="ml-4 text-sm text-blue-600 underline"
        >
          Clear
        </button>
      </div>

      {/* Tenses */}
      <label className="block font-semibold mt-4">Tenses</label>
      <div className="flex flex-wrap gap-3 mt-2">
        {TENSES.map(t => (
          <label key={t} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedTenses.includes(t)}
              onChange={() =>
                setSelectedTenses(prev =>
                  prev.includes(t)
                    ? prev.filter(x => x !== t)
                    : [...prev, t]
                )
              }
            />
            {t}
          </label>
        ))}
      </div>

      {/* Persons */}
      <label className="block font-semibold mt-4">Persons</label>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {SUBJECTS.map(p => (
          <label key={p} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedPersons.includes(p)}
              onChange={() =>
                setSelectedPersons(prev =>
                  prev.includes(p)
                    ? prev.filter(x => x !== p)
                    : [...prev, p]
                )
              }
            />
            {p}
          </label>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={newQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          New Question
        </button>
        <button
          onClick={checkAnswer}
          className="bg-green-500 text-white px-4 py-2 rounded"
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
  )
}
