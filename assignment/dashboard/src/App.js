import React, { useState, useEffect } from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
// import Dashboard from './components/dashboard';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Dash from './components/Dash';


import TrackExpense from './budget_components/TrackExpense';
import SpendingAnalysis from './budget_components/SpendingAnalysis';
import CreateBudget from './budget_components/CreateBudget';
import Sidebar from './components/Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} onToggleSidebar={toggleSidebar} />

      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/Dash" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/Dash"
            element={isLoggedIn ? <Dash /> : <Navigate to="/login" />}
          />
          <Route path="/budget" element={<CreateBudget />} /> {/* Add routes */}
          <Route path="/spending-analysis" element={<SpendingAnalysis />} />
          <Route path="/track-expense" element={<TrackExpense />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;