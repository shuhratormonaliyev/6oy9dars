import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import Login from './components/Login'
import Register from './components/Register';
import Home from './components/Home'
import MainLayout from './components/layout/MainLayout';
import Details from './components/Details';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate('/login');
    }
    return children;
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <div className="text-xl font-bold">
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/register" className="mr-4 hover:underline">Register</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path='/products/:id'
          element = {
            <PrivateRoute token = {!!token}>
              <MainLayout>
                <Details></Details>
              </MainLayout>
            </PrivateRoute>
          }
          >
          </Route>
          <Route path="/" element={<Home></Home>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
