import React from 'react'
import Card from '../components/Card.jsx'
import { SUBJECTS, VERBS } from '../data/verbs_es.js'
import { sample, normalise } from '../lib/utils.js'
import { supabase } from '../lib/supabase.js'

function useLocalSetting(key, initial){
  const [state, setState] = React.useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })
  React.useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [key, state])
  return [state, setState]
}

function getSessionId(){
  let id = localStorage.getItem('session_id')
  if(!id){
    id = 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('session_id', id)
  }
  return id
}

export default function Practice(){
  const [filter, setFilter] = useLocalSetting('filter', 'both')
  const pool = VERBS.filter(v => filter==='both' ? true : filter==='regular' ? v.regular : !v.regular)

  const [question, setQuestion] = React.useState(() => {
    const v = sample(pool)
    const i = Math.floor(Math.random()*SUBJECTS.length)
    return {verb: v, subjectIndex: i}
  })
  const [guess, setGuess] = React.useState('')
  const [feedback, setFeedback] = React.useState(null)
  const [count, setCount] = React.useState(0)
  const [correct, setCorrect] = React.useState(0)

  const ask = React.useCallback(() => {
    const v = sample(pool)
    const i = Math.floor(Math.random()*SUBJECTS.length)
    setQuestion({verb: v, subjectIndex: i})
    setGuess('')
    setFeedback(null)
  }, [pool])

  const onSubmit = async (e) => {
    e.preventDefault()
    const answer = question.verb.forms[question.subjectIndex]
    const ok = normalise(guess) === normalise(answer)
    setFeedback({ok, answer})
    setCount(c => c+1)
    setCorrect(c => c + (ok?1:0))
    setTimeout(ask, 800)

    // --- Supabase logging (attempt + points) ---
    const sid = getSessionId()

    // 1) Log attempt (ignore errors silently for MVP)
    try {
      await supabase.from('attempts').insert({
        session_id: sid,
        infinitive: question.verb.infinitive,
        subject_index: question.subjectIndex,
        correct: ok
      })
    } catch {}

    // 2) If correct, increment points via RPC
    if (ok) {
      try {
        await supabase.rpc('increment_points', { sid_param: sid })
      } catch {}
    }
  }

  const accuracy = count ? Math.round((correct/count)*100) : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Practice</h1>
        <span className="ml-auto text-sm text-slate-600">Score: {correct}/{count} ({accuracy}%)</span>
      </div>

      <Card>
        <div className="flex gap-2 items-center text-sm">
          <label className="font-medium text-slate-700">Question pool:</label>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300">
            <option value="both">Both</option>
            <option value="regular">Regular only</option>
            <option value="irregular">Irregular only</option>
          </select>
          <button onClick={ask} className="ml-auto px-3 py-2 rounded-xl bg-slate-900 text-white">New question</button>
        </div>
      </Card>

      <Card className="text-center">
        <div className="text-slate-600 text-sm mb-1">{question.verb.tense} · Spanish</div>
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
