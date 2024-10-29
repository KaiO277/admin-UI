// src/components/Header.js
import React from 'react';
import logo from '../images/logo.png'

const Header = ({ user }) => {
  return (
    <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center fixed-top" style={{ zIndex: 1000 }}>
      <div className="d-flex align-items-center">
        <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
        <h4 className="m-0">Hope Horizon Admin</h4>
      </div>
      <div>
        <span>Welcome, {user} !</span>
      </div>
    </header>
  );
};

export default Header;
