import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const userLogin = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };

    fetch('https://auth-rg69.onrender.com/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
          return;
        }
        console.log('Foydalanuvchi muvaffaqiyatli tizimga kirdi');
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch(error => {
        console.error('Xatolik:', error);
        setError('Xatolik yuz berdi. Iltimos, keyinroq qayta urinib koring.');
      });
  }

  return (
    <div className='bg-slate-400 min-h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md space-y-4'>
        {error && <p className='text-red-500'>{error}</p>}
        <input
          type='text'
          ref={usernameRef}
          placeholder='Foydalanuvchi nomini kiriting ...'
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <input
          type='password'
          ref={passwordRef}
          placeholder='Parolni kiriting ...'
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'
        >
          Login 
        </button>
        <Link to="/register" className="text-blue-500 hover:underline mt-3">Ro'yxatdan o'tish</Link>
      </form>
    </div>
  );
}

export default Login;