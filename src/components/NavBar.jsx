import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const T = ({to, children}) => {
  const loc = useLocation()
  const active = loc.pathname === to
  return (
    <Link to={to} className={`px-3 py-2 rounded-xl text-sm font-medium ${active ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'}`}>
      {children}
    </Link>
  )
}

export default function NavBar(){
  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
        <div className="font-bold text-slate-900">Verb Trainer</div>
        <div className="ml-auto flex gap-2">
          <T to="/">Home</T>
          <T to="/practice">Practice</T>
          <T to="/verbs">Verbs</T>
          <T to="/settings">Settings</T>
        </div>
      </div>
    </nav>
  )
}
