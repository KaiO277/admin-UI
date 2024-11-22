import React from 'react';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faBars } from '@fortawesome/free-solid-svg-icons'; 

const Header = ({ user, toggleSidebar }) => {
  const username = localStorage.getItem('username');
  return (
    <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center fixed-top" style={{ zIndex: 1000 }}>
      <div className="d-flex align-items-center">
        {/* Toggle Button for small screens */}
        {/* <button  > */}
          <FontAwesomeIcon onClick={toggleSidebar} className="toggle-btn d-md-none mr-3" icon={faBars} /> {/* Correct icon usage */}
        {/* </button> */}
        <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '10px',marginLeft: '100px' }} />
        <h4 className="m-0">Hope Horizon Admin</h4>
      </div>
      <div>
        <span>Welcome, {username}!</span>
      </div>
    </header>
  );
};

export default Header;
