import React, { Children } from "react";
import { useNavigate } from "react-router-dom";

function MainLayout(children) {


    const navigate = useNavigate();

    function handleClick(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }
  return (
    <div>
      <header className="w-full bg-blue-500 py-3">
        <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <a href="">Logo</a>
        </div>
        <nav>
          <button onClick={handleClick} className="bg-blue-700 py-3 px-6 rounded-md text-white">Logout</button>
        </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

export default MainLayout;
