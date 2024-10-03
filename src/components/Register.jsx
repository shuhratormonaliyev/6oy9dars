import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const rePasswordRef = useRef();
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  function validateInputs() {
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const email = emailRef.current.value.trim();

    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return false;
    }

    if (password.length < 3) {
      setError('Password should be at least 6 characters long');
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!validateInputs()) {
      return;
    }

    const userRegister = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };

    fetch('https://auth-rg69.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRegister),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Success:', data);
          alert('Registration successful. You can now log in.');
          navigate('/login'); 
        } else {
          setError(data.message || 'Registration failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      });
  }

  return (
    <div className='bg-slate-400 min-h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md space-y-4'>
        {error && <p className='text-red-500'>{error}</p>}
        <input
          type='text'
          ref={usernameRef}
          placeholder='Enter username ...'
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <input
          type='email'
          ref={emailRef}
          placeholder='Enter email ...'
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <input
          type='password'
          ref={passwordRef}
          placeholder='Enter password ...'
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'
        >
          Register
        </button>
        <Link to="/login" className="text-blue-500 hover:underline mt-3">Go to Login</Link>
      </form>
    </div>
  );
}

export default Register;
