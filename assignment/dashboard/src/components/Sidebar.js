// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaChartBar, FaDollarSign, FaList } from 'react-icons/fa';
import { MdTrackChanges } from 'react-icons/md'; // For track expense

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className="sidebar-toggle" 
        onClick={onToggle}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      <ul className="sidebar-menu">
        <li>
          <Link to="/" className="sidebar-item">
            <FaHome />
            {isOpen && <span>Home</span>}
          </Link>
        </li>
        <li>
          <Link to="/Dash" className="sidebar-item">
            <FaTachometerAlt />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/budget" className="sidebar-item">
            <FaDollarSign />
            {isOpen && <span>Budget</span>}
          </Link>
        </li>
        <li>
          <Link to="/spending-analysis" className="sidebar-item">
            <FaList />
            {isOpen && <span>Spending Analysis</span>}
          </Link>
        </li>
        <li>
          <Link to="/track-expense" className="sidebar-item">
            <MdTrackChanges />
            {isOpen && <span>Track Expense</span>}
          </Link>
        </li>
        <li>
          <Link to="/analytics" className="sidebar-item">
            <FaChartBar />
            {isOpen && <span>Analytics</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
