import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../pages/url';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password
      });
      if(response.data.code===201){
        
      }
    } catch (error) {
      console.error('signup error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-500 to-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email id:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-200"
            >
              sign up
            </button>
            <button
              type="button" // Change to type="button" to prevent form submission
              onClick={() => { window.location.href = '/Signin'; }} // Navigate programmatically
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
