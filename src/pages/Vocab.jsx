import { useMemo, useState, useEffect } from 'react'
import { THEMES, UNITS, VOCAB, unitsForTheme } from '../data/vocab_es_foundation'

// Normalise strings for forgiving matching (ignores case/extra spaces)
const norm = s => (s || '').trim().toLowerCase()

export default function Vocab() {
  const [theme, setTheme] = useState('T1')
  const [selectedUnits, setSelectedUnits] = useState([])
  const [direction, setDirection] = useState('es-en') // 'es-en' or 'en-es'
  const [current, setCurrent] = useState(null) // {q, a, source}
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState({ correct: 0, attempts: 0 })

  // When theme changes, default to all its units
  useEffect(() => {
    const themeUnits = unitsForTheme(theme).map(u => u.id)
    setSelectedUnits(themeUnits)
  }, [theme])

  // Filter pool based on theme + units
  const pool = useMemo(() => {
    const activeUnits = new Set(selectedUnits)
    return VOCAB.filter(v => {
      // match theme via the unit; (robust if you add items with correct unit ids)
      return activeUnits.has(v.unit)
    })
  }, [selectedUnits])

  function newCard() {
    if (pool.length === 0) {
      setCurrent(null)
      setFeedback('No items for this selection.')
      return
    }
    const item = pool[Math.floor(Math.random() * pool.length)]
    const q = direction === 'es-en' ? item.es : item.en
    const a = direction === 'es-en' ? item.en : item.es
    setCurrent({ q, a, source: item })
    setAnswer('')
    setFeedback('')
  }

  function check() {
    if (!current) return
    const isCorrect = norm(answer) === norm(current.a)
    setFeedback(isCorrect ? '✅ Correct!' : `❌ Correct: ${current.a}`)
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), attempts: s.attempts + 1 }))
    setTimeout(() => newCard(), 900)
  }

  // Enter submits
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Enter' && answer.trim()) {
        e.preventDefault()
        check()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer, current, direction])

  function toggleUnit(id) {
    setSelectedUnits(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function resetScore() {
    setScore({ correct: 0, attempts: 0 })
    setFeedback('')
    setAnswer('')
    newCard()
  }

  const themeUnits = unitsForTheme(theme)

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold mb-4">GCSE Vocab Trainer (Foundation)</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Theme + Units */}
        <div>
          <label className="block font-semibold">Theme</label>
          <select
            className="border p-2 rounded mt-1 w-full"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            {THEMES.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          <label className="block font-semibold mt-4">Units</label>
          <div className="flex flex-col gap-2 mt-2">
            {themeUnits.map(u => (
              <label key={u.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedUnits.includes(u.id)}
                  onChange={() => toggleUnit(u.id)}
                />
                {u.label}
              </label>
            ))}
            <div className="flex gap-3 mt-1">
              <button
                className="text-sm text-blue-600 underline"
                onClick={() => setSelectedUnits(themeUnits.map(u => u.id))}
              >
                Select all
              </button>
              <button
                className="text-sm text-blue-600 underline"
                onClick={() => setSelectedUnits([])}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Direction + Controls */}
        <div>
          <label className="block font-semibold">Direction</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dir"
                value="es-en"
                checked={direction === 'es-en'}
                onChange={() => setDirection('es-en')}
              />
              Spanish → English
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dir"
                value="en-es"
                checked={direction === 'en-es'}
                onChange={() => setDirection('en-es')}
              />
              English → Spanish
            </label>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={newCard}
            >
              New Card
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={check}
              disabled={!current || !answer.trim()}
            >
              Check
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={resetScore}
            >
              Reset Score
            </button>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 border-t pt-4">
        {current ? (
          <>
            <div className="text-sm text-gray-600 mb-2">
              Theme: <strong>{THEMES.find(t => t.id === current.source.theme)?.label}</strong> · Unit:{' '}
              <strong>{UNITS.find(u => u.id === current.source.unit)?.label}</strong>
            </div>
            <div className="text-2xl font-bold mb-3">{current.q}</div>
            <input
              className="border p-2 rounded w-full"
              placeholder="Type your answer and press Enter…"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
            {feedback && <p className="mt-3 font-semibold">{feedback}</p>}
          </>
        ) : (
          <p className="text-gray-500 italic">Click “New Card” to begin.</p>
        )}
      </div>

      {/* Score */}
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
