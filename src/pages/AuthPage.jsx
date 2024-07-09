// AuthPage.jsx
import React, { useState } from 'react';
import './AuthPage.css'; // Import the CSS file for styling
import SignUp from './SignUp'; // Import the SignUp component

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <div className="container" id="container">
      <div className={`form-container ${isLoginMode ? 'sign-in' : 'sign-up'}`}>
        {isLoginMode ? (
          // Render sign-in form here
          // Include the sign-in form JSX as in your original AuthPage component
        ) : (
          // Render sign-up form here
          <SignUp />
        )}
      </div>
      <div className="toggle-container">
        {/* Toggle panel code remains the same */}
      </div>
    </div>
  );
}

export default AuthPage;
