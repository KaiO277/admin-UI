// src/components/Layout.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.scss';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <Header toggleSidebar={toggleSidebar} user="Admin" />
      <Sidebar isOpen={isSidebarOpen} />
      <main className="content" style={{ marginLeft: isSidebarOpen ? '200px' : '0', transition: 'margin-left 0.3s ease' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
