import React from 'react'
import Card from '../components/Card.jsx'
import { VERBS } from '../data/verbs_es.js'

export default function Verbs(){
  const regular = VERBS.filter(v=>v.regular)
  const irregular = VERBS.filter(v=>!v.regular)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Spanish verbs – Present tense</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold mb-2">Regular</h2>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500">
              <th className="py-1">Infinitive</th><th className="py-1">Conjugations</th>
            </tr></thead>
            <tbody>
              {regular.map(v=>(
                <tr key={v.infinitive} className="border-t">
                  <td className="py-1 font-medium">{v.infinitive}</td>
                  <td className="py-1 text-slate-700">{v.forms.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card>
          <h2 className="font-semibold mb-2">Irregular</h2>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500">
              <th className="py-1">Infinitive</th><th className="py-1">Conjugations</th>
            </tr></thead>
            <tbody>
              {irregular.map(v=>(
                <tr key={v.infinitive} className="border-t">
                  <td className="py-1 font-medium">{v.infinitive}</td>
                  <td className="py-1 text-slate-700">{v.forms.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
