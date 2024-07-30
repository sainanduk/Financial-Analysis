import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../pages/url';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('financialtoken');
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        username,
        password,
      });
      localStorage.setItem('financialtoken', response.data.financialtoken);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-500 to-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"> {/* Adjust shadow class */}
        <h2 className="text-3xl font-bold text-center mb-6">Signin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 text-center">
            <a href="#" className="text-blue-500 hover:text-blue-700 hover:underline-none focus:outline-none">
              Lost password? Click here!
            </a>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-200"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { navigate('/Signup'); }}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
