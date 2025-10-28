import { useMemo, useState, useEffect } from 'react'
import { THEMES, VOCAB as STATIC_VOCAB } from '../data/vocab_es_foundation'
import { UNITS, unitsForTheme, categorise } from '../data/vocab_catalogue'

// -----------------------------
// Normalisation utilities
// -----------------------------
const stripDiacritics = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const collapseSpaces = (s) =>
  (s || '').replace(/\s+/g, ' ').trim()

const removePunctuation = (s) =>
  (s || '').replace(/[.,;:!?()"'`]/g, '')

const SPAN_ARTICLES = /^(el|la|los|las|un|una|unos|unas)\s+/i

function normEs(s) {
  let out = stripDiacritics(s)
  out = removePunctuation(out.toLowerCase())
  out = out.replace(SPAN_ARTICLES, '')
  out = collapseSpaces(out)
  return out
}
function normEn(s) {
  let out = stripDiacritics(s)
  out = removePunctuation(out.toLowerCase())
  out = out.replace(/^to\s+/, '')
  out = collapseSpaces(out)
  return out
}
function splitAlts(raw) {
  return (raw || '')
    .split(/\s*(?:\/|,|;|\bor\b)\s*/i)
    .filter(Boolean)
}
function matchesFlexible({ user, correct, direction }) {
  const alts = splitAlts(correct)
  if (direction === 'es-en') {
    const u = normEn(user)
    return alts.some(a => normEn(a) === u)
  } else {
    const u = normEs(user)
    return alts.some(a => normEs(a) === u)
  }
}

// -----------------------------
// Light CSV parser (no deps)
// Accepts lines like:
// theme,es,en
// T1,hola,hello
// T3,el aeropuerto,airport
//
// Optional 4th column "unit" is accepted, but not required.
// -----------------------------
function parseCSV(text) {
  const rows = text
    .split(/\r?\n/)
    .map(r => r.trim())
    .filter(Boolean)
  if (rows.length === 0) return []

  // very simple splitter; supports quoted fields with commas
  const parseRow = (r) => {
    const out = []
    let cur = '', inQ = false
    for (let i = 0; i < r.length; i++) {
      const ch = r[i]
      if (ch === '"' ) {
        if (inQ && r[i+1] === '"') { cur += '"'; i++ } else { inQ = !inQ }
      } else if (ch === ',' && !inQ) {
        out.push(cur)
        cur = ''
      } else {
        cur += ch
      }
    }
    out.push(cur)
    return out.map(s => s.trim())
  }

  // detect header
  const header = parseRow(rows[0]).map(h => h.toLowerCase())
  const dataRows = (/^(theme|tema)/i.test(header[0])) ? rows.slice(1) : rows

  const items = []
  for (const r of dataRows) {
    const cols = parseRow(r)
    if (!cols[0] || !cols[1] || !cols[2]) continue
    const theme = cols[0].toUpperCase()
    const es = cols[1]
    const en = cols[2]
    const unit = cols[3] || null
    items.push({ theme, es, en, unit })
  }
  return items
}

export default function Vocab() {
  const [theme, setTheme] = useState('T1')
  const [selectedUnits, setSelectedUnits] = useState([])
  const [direction, setDirection] = useState('es-en')
  const [current, setCurrent] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState({ correct: 0, attempts: 0 })
  const [showUnassigned, setShowUnassigned] = useState(false)

  // Dynamic (imported) vocab appended to static
  const [extraVocab, setExtraVocab] = useState([])

  const ALL_VOCAB = useMemo(() => {
    return [...STATIC_VOCAB, ...extraVocab]
  }, [extraVocab])

  // When theme changes, preselect all its units
  useEffect(() => {
    const themeUnits = unitsForTheme(theme).map(u => u.id)
    setSelectedUnits(themeUnits)
  }, [theme])

  // Build categorised pool based on chosen theme + units
  const pool = useMemo(() => {
    const activeUnits = new Set(selectedUnits)
    const items = ALL_VOCAB
      .filter(v => v.theme === theme)                // narrow to theme
      .map(v => ({ ...v, unitAuto: v.unit || categorise(v) })) // use given unit or auto
      .filter(v => {
        if (activeUnits.has(v.unitAuto)) return true
        if (showUnassigned) return !activeUnits.size
        return false
      })
    return items
  }, [selectedUnits, theme, showUnassigned, ALL_VOCAB])

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
    const ok = matchesFlexible({
      user: answer,
      correct: current.a,
      direction
    })
    setFeedback(ok ? '✅ Correct!' : `❌ Correct: ${current.a}`)
    setScore(s => ({ correct: s.correct + (ok ? 1 : 0), attempts: s.attempts + 1 }))
    setTimeout(() => newCard(), 500)
  }

  // Enter key: start/check
  useEffect(() => {
    const onKey = e => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      if (!current) {
        newCard()
        return
      }
      if (answer.trim()) check()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer, current, direction, pool])

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

  // ----- CSV Import handlers -----
  function handlePasteCSV() {
    const raw = prompt(
      'Paste CSV (columns: theme,es,en[,unit]). First line can be a header.'
    )
    if (!raw) return
    const parsed = parseCSV(raw)
    if (parsed.length === 0) {
      alert('No rows detected.')
      return
    }
    setExtraVocab(v => [...v, ...parsed])
    alert(`Imported ${parsed.length} rows.`)
  }

  function handleFileCSV(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const parsed = parseCSV(String(reader.result))
      if (parsed.length === 0) {
        alert('No rows detected.')
        return
      }
      setExtraVocab(v => [...v, ...parsed])
      alert(`Imported ${parsed.length} rows.`)
    }
    reader.readAsText(file)
  }

  const themeUnits = unitsForTheme(theme)

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold mb-2">GCSE Vocab Trainer (Foundation)</h1>

      {/* Import row */}
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <button
          className="border px-3 py-2 rounded"
          onClick={handlePasteCSV}
          title="Paste CSV from clipboard"
        >
          Import CSV (paste)
        </button>
        <label className="border px-3 py-2 rounded cursor-pointer">
          Import CSV (file)
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileCSV}
            className="hidden"
          />
        </label>
        <span className="text-sm text-gray-500">
          Columns: <code>theme,es,en[,unit]</code> — theme must be T1/T2/T3
        </span>
      </div>

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

            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showUnassigned}
                onChange={() => setShowUnassigned(v => !v)}
              />
              Show any unassigned items (rare)
            </label>
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={newCard}>
              New Card
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={check}
              disabled={!current || !answer.trim()}
            >
              Check
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={resetScore}>
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
              <strong>{UNITS.find(u => u.id === (current.source.unit || categorise(current.source)))?.label}</strong>
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
