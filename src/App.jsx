import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './pages/Dashboard';
import Departments from './pages/Departments';
import Transactions from './pages/Transactions';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Upload from './pages/Upload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/" element={<Layout />}>
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
