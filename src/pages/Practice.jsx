
import React from 'react'
import Card from '../components/Card.jsx'
import { SUBJECTS, TENSES, VERB_BANK } from '../data/verbs_es.js'
import { sample, normalise } from '../lib/utils.js'

function useLocalSetting(key, initial){
  const [state, setState] = React.useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })
  React.useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [key, state])
  return [state, setState]
}

const PACKS = [
  { id: 'top50', label: 'Top 50' },
  { id: 'gcse', label: 'GCSE list' },
]

export default function Practice(){
  // Filters
  const [regularity, setRegularity] = useLocalSetting('regularity', 'both') // both | regular | irregular
  const [enabledTenses, setEnabledTenses] = useLocalSetting('enabledTenses', ['presente'])
  const [enabledPacks, setEnabledPacks] = useLocalSetting('enabledPacks', []) // none means all
  const [enabledSubjects, setEnabledSubjects] = useLocalSetting('enabledSubjects', [0,1,2,3,4,5]) // indices

  // Build pool based on filters
  const verbPool = React.useMemo(() => {
    return VERB_BANK.filter(v => {
      if (regularity === 'regular' && !v.regular) return false
      if (regularity === 'irregular' && v.regular) return false
      if (enabledPacks.length > 0 && !enabledPacks.some(p => (v.packs||[]).includes(p))) return false
      return enabledTenses.some(t => v.tenses && v.tenses[t])
    })
  }, [regularity, enabledPacks, enabledTenses])

  const pickQuestion = React.useCallback(() => {
    const v = sample(verbPool.length ? verbPool : VERB_BANK)
    const tensesForVerb = TENSES.filter(t => enabledTenses.includes(t) && v.tenses && v.tenses[t])
    const tense = (tensesForVerb.length ? sample(tensesForVerb) : 'presente')
    const subjectIndex = sample(enabledSubjects.length ? enabledSubjects : [0,1,2,3,4,5])
    return { verb: v, tense, subjectIndex }
  }, [verbPool, enabledTenses, enabledSubjects])

  const [question, setQuestion] = React.useState(pickQuestion)
  const [guess, setGuess] = React.useState('')
  const [feedback, setFeedback] = React.useState(null)
  const [count, setCount] = React.useState(0)
  const [correct, setCorrect] = React.useState(0)

  const ask = React.useCallback(() => {
    setQuestion(pickQuestion())
    setGuess('')
    setFeedback(null)
  }, [pickQuestion])

  const onSubmit = (e) => {
    e.preventDefault()
    const answer = question.verb.tenses[question.tense][question.subjectIndex]
    const ok = normalise(guess) === normalise(answer)
    setFeedback({ok, answer})
    setCount(c => c+1)
    setCorrect(c => c + (ok?1:0))
    setTimeout(ask, 900)
  }

  const accuracy = count ? Math.round((correct/count)*100) : 0

  const toggleInArray = (arr, setArr, value) => {
    if (arr.includes(value)) setArr(arr.filter(x => x!==value))
    else setArr([...arr, value])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <h1 className="text-2xl font-bold">Practice</h1>
        <span className="ml-auto text-sm text-slate-600">Score: {correct}/{count} ({accuracy}%)</span>
      </div>

      <Card>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-700">Regularity</div>
            <div className="flex gap-2">
              <select value={regularity} onChange={e=>setRegularity(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300">
                <option value="both">Both</option>
                <option value="regular">Regular only</option>
                <option value="irregular">Irregular only</option>
              </select>
            </div>

            <div className="text-sm font-semibold text-slate-700 mt-4">Packs</div>
            <div className="flex flex-wrap gap-2">
              {PACKS.map(p => (
                <label key={p.id} className={(enabledPacks.includes(p.id) ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-700") + " px-3 py-1 rounded-xl border cursor-pointer"}>
                  <input type="checkbox" className="mr-2" checked={enabledPacks.includes(p.id)} onChange={()=>toggleInArray(enabledPacks, setEnabledPacks, p.id)} />
                  {p.label}
                </label>
              ))}
              <button onClick={()=>setEnabledPacks([])} className="text-xs text-slate-600 underline ml-1">Clear</button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-700">Tenses</div>
            <div className="flex flex-wrap gap-2">
              {TENSES.map(t => (
                <label key={t} className={(enabledTenses.includes(t) ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-700") + " px-3 py-1 rounded-xl border cursor-pointer"}>
                  <input type="checkbox" className="mr-2" checked={enabledTenses.includes(t)} onChange={()=>toggleInArray(enabledTenses, setEnabledTenses, t)} />
                  {t}
                </label>
              ))}
            </div>

            <div className="text-sm font-semibold text-slate-700 mt-4">Persons</div>
            <div className="grid grid-cols-3 gap-2">
              {SUBJECTS.map((s, idx) => (
                <label key={s} className={(enabledSubjects.includes(idx) ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-700") + " px-3 py-1 rounded-xl border text-center cursor-pointer"}>
                  <input type="checkbox" className="mr-2" checked={enabledSubjects.includes(idx)} onChange={()=>toggleInArray(enabledSubjects, setEnabledSubjects, idx)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <button onClick={ask} className="ml-auto px-3 py-2 rounded-xl bg-slate-900 text-white">New question</button>
        </div>
      </Card>

      <Card className="text-center">
        <div className="text-slate-600 text-sm mb-1">{question.tense} · Spanish</div>
        <div className="text-3xl font-extrabold mb-2">{question.verb.infinitive}</div>
        <div className="text-lg text-slate-700 mb-4">{SUBJECTS[question.subjectIndex]}</div>
        <form onSubmit={onSubmit} className="flex gap-2 justify-center">
          <input autoFocus value={guess} onChange={e=>setGuess(e.target.value)} placeholder="Type the correct form" className="px-4 py-3 rounded-xl border border-slate-300 w-72 text-center" />
          <button className="px-4 py-3 rounded-xl bg-slate-900 text-white">Check</button>
        </form>
        {feedback && (
          <div className={`mt-3 text-sm font-medium ${feedback.ok ? 'text-green-700' : 'text-red-700'}`}>
            {feedback.ok ? '✅ Correct!' : `❌ Correct answer: ${feedback.answer}`}
          </div>
        )}
      </Card>
    </div>
  )
}
