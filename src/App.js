import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import PostAuthor from './pages/PostAuthor';
import PostCategories from './pages/PostCategories';
import PostIndex from './pages/PostIndex';
import PodcastAuthor from './pages/PodcastAuthor';
import PodcastCategories from './pages/PodcastCategories';
import PodcastIndex from './pages/PodcastIndex';
import LoginPage from './pages/LoginPage';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const location = useLocation();

  // Lưu trạng thái đăng nhập vào localStorage sau khi đăng nhập thành công
  const handleLogin = (user) => {
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem('username', user);
    localStorage.setItem('access_token', 'token_value'); // Thay 'token_value' bằng token thực nhận được từ API
  };

  // Xóa localStorage và trạng thái khi đăng xuất
  const handleLogout = () => {
    setUsername(null);
    setIsAuthenticated(false);
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
  };

  return (
    <div>
      <Header username={username} onLogout={handleLogout} />
      <div className="d-flex" style={{ marginTop: '56px' }}>
        {/* Ẩn Sidebar nếu đang ở trang Login */}
        {location.pathname !== '/login' && <Sidebar />}
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
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
