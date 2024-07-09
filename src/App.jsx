import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Departments from './pages/Departments';
import Transactions from './pages/Transactions';
import RegistrationForm from './pages/RegistrationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<RegistrationForm />} /> {/* Route for Login */}
        <Route path="/signup" element={<RegistrationForm />} /> {/* Route for SignUp */}
      </Routes>
    </Router>
  );
}

export default App;
