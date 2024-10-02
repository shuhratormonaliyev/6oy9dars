import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import Login from './components/Login'
import Register from './components/Register';
import Home from './components/Home'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <div className="text-xl font-bold">
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/register" className="mr-4 hover:underline">Register</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </nav>

      {/* Routes */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
