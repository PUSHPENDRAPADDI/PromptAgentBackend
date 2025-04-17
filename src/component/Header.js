import React, { useState } from 'react';
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthProviderContext';

const Header = ({ toggleAgentLibrary, headerName }) => {
  const { role } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ name: 'John Doe' });

  // const handleLoginLogout = () => {
  //   if (isLoggedIn) {
  //     setIsLoggedIn(false);
  //     setUser({ name: '' });
  //   } else {
  //     setIsLoggedIn(true);
  //     setUser({ name: 'John Doe' });
  //   }
  // };

  const handleDeleteAllAgents = () => {
    fetch('http://localhost:5000/api/deleteAllAgents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Agents deleted')
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <header className="header-main">
      <div className="logo">
        <img className='logo-img' src={logo} />
        <h3>AI Solutions</h3>
      </div>
      <div className="heading">{headerName}</div>
      <div className="user-details">
        {
          role === 'engineering' &&
          <button onClick={handleDeleteAllAgents}>Delete Agents</button>
        }
      </div>
    </header>
  );
};

export default Header;