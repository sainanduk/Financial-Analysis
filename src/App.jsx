import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Departments from './pages/Departments';
import Transactions from './pages/Transactions';
import Signin from './components/Signin';
import Signup from './components/Signup';


function App() {
  return (
    <Router>
      <Routes>
          <Route index element={<Signin/>}/>
          <Route path='Signup' element={<Signup/>}/>
          <Route path="/" element={<Layout />}>
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
