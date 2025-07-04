import React, { useContext, useState, useEffect } from 'react';
import HostContext from '../context/HostContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { host } = useContext(HostContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('AuthToken')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${host}api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      localStorage.setItem('AuthToken', jsonResponse.token);
      localStorage.setItem('userName', jsonResponse.user.userName);
      navigate('/');
    } else {
      alert(jsonResponse.msg || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white p-6">
      <div className="bg-[#2b2b2b] p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://img.icons8.com/fluency/48/code.png"
            alt="CodeSync Logo"
            className="w-12 h-12 mb-4"
          />
          <h2 className="text-2xl font-semibold text-white">Welcome back to CodeSync</h2>
          <p className="text-sm text-gray-400 mt-1">Collaborative coding made easy</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 bg-[#1e1e1e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <Link to="#" className="text-sm text-blue-400 hover:underline">
              Forgot password?
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400 mb-3">New here?</p>
          <Link to="/signup" className="text-sm text-blue-400 hover:underline">
            Create your CodeSync account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
