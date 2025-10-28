
import React from 'react'
import Card from '../components/Card.jsx'
import { VERB_BANK, TENSES } from '../data/verbs_es.js'

export default function Verbs(){
  const regular = VERB_BANK.filter(v=>v.regular)
  const irregular = VERB_BANK.filter(v=>!v.regular)
  const renderRow = (v) => (
    <tr key={v.infinitive} className="border-t align-top">
      <td className="py-2 font-medium">{v.infinitive}</td>
      <td className="py-2 text-slate-700">{(v.packs||[]).join(', ') || '—'}</td>
      <td className="py-2 text-slate-700">
        {TENSES.filter(t=>v.tenses && v.tenses[t]).map(t => (
          <div key={t}><span className="font-semibold">{t}:</span> {v.tenses[t].join(', ')}</div>
        ))}
      </td>
    </tr>
  )
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Spanish verbs – Multi-tense</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold mb-2">Regular</h2>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500">
              <th className="py-1">Infinitive</th><th className="py-1">Packs</th><th className="py-1">Conjugations</th>
            </tr></thead>
            <tbody>{regular.map(renderRow)}</tbody>
          </table>
        </Card>
        <Card>
          <h2 className="font-semibold mb-2">Irregular</h2>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500">
              <th className="py-1">Infinitive</th><th className="py-1">Packs</th><th className="py-1">Conjugations</th>
            </tr></thead>
            <tbody>{irregular.map(renderRow)}</tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
