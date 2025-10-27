import React from 'react'
import Card from '../components/Card.jsx'

export default function Home(){
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome 👋</h1>
      <Card>
        <p className="text-slate-700">
          This is the MVP of your <span className="font-semibold">Verb Trainer</span>. 
          Start with <span className="font-semibold">Practice</span> to quiz the Spanish present tense.
          The <span className="font-semibold">Verbs</span> page lists regular and irregular verbs separately (your preference).
          Settings lets you tweak a few options.
        </p>
      </Card>
      <Card>
        <ol className="list-decimal ml-5 text-slate-700 space-y-1">
          <li>Go to <span className="font-semibold">Practice</span> and answer 10 questions.</li>
          <li>Pick only regular / only irregular / both.</li>
          <li>Future: add points & leaderboards with Supabase (placeholders ready).</li>
        </ol>
      </Card>
    </div>
  )
}
