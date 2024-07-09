// RegistrationForm.js
import React, { useState } from 'react';
import './RegistrationForm.css'; // Import your CSS module

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const apiUrl = 'https://your-api-url.com';

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your authentication logic here
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div className="container">
      {/* Input type checkbox for toggling */}
      <input type="checkbox" id="register_toggle" />

      {/* Slider for toggling between Login and Register */}
      <div className="slider">
        {/* Login Form */}
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="title">{isRegisterMode ? 'Register' : 'Login'}</h2>
          <div className="form_control">
            <input
              type="text"
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="label">Username</label>
          </div>
          <div className="form_control">
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="label">Password</label>
          </div>
          <button type="submit">
            {isRegisterMode ? 'Register' : 'Login'}
          </button>
          <p className="bottom_text">
            {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span className="switch" onClick={toggleMode}>
              {isRegisterMode ? 'Login here' : 'Register here'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
