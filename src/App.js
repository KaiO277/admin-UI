import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import PostAuthor from './pages/PostAuthor';
import PostCategories from './pages/PostCategories';
import PostIndex from './pages/PostIndex';
import UserList from './pages/UserList';
import PodcastAuthor from './pages/PodcastAuthor';
import PodcastCategories from './pages/PodcastCategories';
import PodcastIndex from './pages/PodcastIndex';
import LoginPage from './pages/LoginPage';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogin = (user) => {
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem('username', user);
    localStorage.setItem('access_token', 'token_value'); 
  };

  const handleLogout = () => {
    setUsername(null);
    setIsAuthenticated(false);
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    // Render độc lập LoginPage nếu đường dẫn là /login
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={isSidebarOpen ? "sidebar-open" : "collapsed-sidebar"}>
      {/* Hiển thị Header nếu đã đăng nhập */}
      {isAuthenticated && (
        <Header username={username} onLogout={handleLogout} toggleSidebar={toggleSidebar} />
      )}
      <div className="d-flex" style={{ marginTop: isAuthenticated ? '56px' : '0' }}>
        {/* Hiển thị Sidebar nếu đã đăng nhập */}
        {isAuthenticated && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
        <div className="main-content flex-grow-1 p-3">
          <Routes>
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/user/list" element={isAuthenticated ? <UserList /> : <Navigate to="/login" />} />
            <Route path="/post/author" element={isAuthenticated ? <PostAuthor /> : <Navigate to="/login" />} />
            <Route path="/post/categories" element={isAuthenticated ? <PostCategories /> : <Navigate to="/login" />} />
            <Route path="/post/index" element={isAuthenticated ? <PostIndex /> : <Navigate to="/login" />} />
            <Route path="/podcast/author" element={isAuthenticated ? <PodcastAuthor /> : <Navigate to="/login" />} />
            <Route path="/podcast/categories" element={isAuthenticated ? <PodcastCategories /> : <Navigate to="/login" />} />
            <Route path="/podcast/index" element={isAuthenticated ? <PodcastIndex /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
