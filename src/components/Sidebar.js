import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.scss';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate(); 
  const [postOpen, setPostOpen] = useState(false);
  const [podcastOpen, setPodcastOpen] = useState(false);

  // Lấy thông tin roles từ localStorage
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  // Kiểm tra quyền
  const isSuperAdmin = roles.includes('superadmin');
  const isAuthorPost = roles.includes('AuthorPost');
  const isAuthorPodcast = roles.includes('AuthorPodcast');

  const togglePost = () => setPostOpen(!postOpen);
  const togglePodcast = () => setPodcastOpen(!podcastOpen);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('roles');
    navigate('/login'); 
  };

  return (
    <div className={`sidebar bg-dark text-white p-3 ${isOpen ? 'open' : ''}`}>
      <ul className="nav flex-column">
        {/* Home */}
        <li className="nav-item mb-2">
          <Link to="/home" className="nav-link text-white">Home</Link>
        </li>

        {isSuperAdmin && (
          <li className="nav-item mb-2">
            <Link to="/user/list" className="nav-link text-white">User</Link>
          </li>
        )}

        {/* Post Menu */}
        {(isSuperAdmin || isAuthorPost) && (
          <li className="nav-item mb-2">
            <a href="#" onClick={togglePost} className="nav-link text-white d-flex justify-content-between align-items-center">
              Post
              <span>{postOpen ? '▾' : '▸'}</span>
            </a>
            {postOpen && (
              <ul className="nav flex-column ml-3 pl-3" style={{ borderLeft: '1px solid #ffffff33' }}>
                {isSuperAdmin && (
                  <li className="nav-item">
                    <Link to="/post/author" className="nav-link text-white">Author</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/post/categories" className="nav-link text-white">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link to="/post/index" className="nav-link text-white">Post Index</Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Podcast Menu */}
        {(isSuperAdmin || isAuthorPodcast) && (
          <li className="nav-item mb-2">
            <a href="#" onClick={togglePodcast} className="nav-link text-white d-flex justify-content-between align-items-center">
              Podcast
              <span>{podcastOpen ? '▾' : '▸'}</span>
            </a>
            {podcastOpen && (
              <ul className="nav flex-column ml-3 pl-3" style={{ borderLeft: '1px solid #ffffff33' }}>
                {isSuperAdmin && (
                  <li className="nav-item">
                    <Link to="/podcast/author" className="nav-link text-white">Author</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/podcast/categories" className="nav-link text-white">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link to="/podcast/index" className="nav-link text-white">Podcast Index</Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {/* Logout */}
        <li className="nav-item mt-auto">
          <button onClick={handleLogout} className="nav-link text-white bg-dark border-0" style={{ cursor: 'pointer' }}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
