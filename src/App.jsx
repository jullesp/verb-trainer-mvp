import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Practice from './pages/Practice.jsx'
import Verbs from './pages/Verbs.jsx'
import Vocab from './pages/Vocab.jsx'

export default function App() {
  return (
    <BrowserRouter>
      {/* Simple navigation bar */}
      <nav className="p-4 flex gap-4 border-b bg-gray-50">
        <Link to="/" className="text-blue-600 hover:underline">Practice</Link>
        <Link to="/verbs" className="text-blue-600 hover:underline">Verbs</Link>
        <Link to="/vocab" className="text-blue-600 hover:underline">Vocab</Link>
      </nav>

      {/* Main page area */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Practice />} />
          <Route path="/verbs" element={<Verbs />} />
          <Route path="/vocab" element={<Vocab />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
