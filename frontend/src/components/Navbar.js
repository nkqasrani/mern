import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiFolder, FiCheckSquare, FiLogOut, FiUser } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FiCheckSquare /> TaskManager
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <FiHome /> Dashboard
          </Link>
          <Link to="/projects" className="nav-link">
            <FiFolder /> Projects
          </Link>
          <Link to="/tasks" className="nav-link">
            <FiCheckSquare /> Tasks
          </Link>
        </div>

        <div className="navbar-user">
          <span className="user-name">
            <FiUser /> {user.name}
          </span>
          <button onClick={handleLogout} className="btn btn-outline">
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
