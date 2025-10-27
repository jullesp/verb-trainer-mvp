import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Practice from './pages/Practice.jsx'
import Verbs from './pages/Verbs.jsx'
import Settings from './pages/Settings.jsx'

export default function App(){
  return (
    <BrowserRouter>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/verbs" element={<Verbs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
