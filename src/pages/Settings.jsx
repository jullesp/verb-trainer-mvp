import React from 'react'
import Card from '../components/Card.jsx'

function useLocalSetting(key, initial){
  const [state, setState] = React.useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })
  React.useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [key, state])
  return [state, setState]
}

export default function Settings(){
  const [name, setName] = useLocalSetting('display_name','')
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <label className="block text-sm text-slate-600 mb-1">Display name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="px-3 py-2 rounded-xl border border-slate-300 w-80" />
        <p className="text-xs text-slate-500 mt-2">Saved locally. Used for future scoreboard / profiles.</p>
      </Card>
      <Card>
        <h2 className="font-semibold mb-1">Planned features</h2>
        <ul className="list-disc ml-5 text-slate-700 text-sm space-y-1">
          <li>Supabase user profiles & points</li>
          <li>Leaderboards per class (e.g., 7S, Y8, Y12)</li>
          <li>Verb packs by theme (AQA GCSE 2026 spec)</li>
          <li>Support for German & French</li>
        </ul>
      </Card>
    </div>
  )
}
