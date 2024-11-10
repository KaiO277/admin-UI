import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Sidebar.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const navigate = useNavigate(); 
  const [postOpen, setPostOpen] = useState(false);
  const [podcastOpen, setPodcastOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/home'); // State lưu đường dẫn mục đang chọn

  const togglePost = () => setPostOpen(!postOpen);
  const togglePodcast = () => setPodcastOpen(!podcastOpen);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login'); 
  };

  const handleSetActive = (path) => {
    setActiveLink(path); // Cập nhật đường dẫn khi nhấn vào mục
  };

  return (
    <div className="bg-dark text-white p-3" style={{ height: '100vh', width: '200px' }}>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link 
            to="/home" 
            className={`nav-link ${activeLink === '/home' ? 'active-link' : 'text-white'}`} 
            onClick={() => handleSetActive('/home')}
          >
            Home
          </Link>
        </li>

        <li className="nav-item mb-2">
          <a 
            href="#" 
            onClick={() => {
              togglePost();
              handleSetActive('post');
            }} 
            className={`nav-link ${activeLink === 'post' ? 'active-link' : 'text-white'} d-flex justify-content-between align-items-center`}
          >
            Post
            <span>{postOpen ? '▾' : '▸'}</span>
          </a>
          {postOpen && (
            <ul className="nav flex-column ml-3 pl-3" style={{ borderLeft: '1px solid #ffffff33' }}>
              <li className="nav-item">
                <Link 
                  to="/post/author" 
                  className={`nav-link ${activeLink === '/post/author' ? 'active-link' : 'text-white'}`} 
                  onClick={() => handleSetActive('/post/author')}
                >
                  Author
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/post/categories" 
                  className={`nav-link ${activeLink === '/post/categories' ? 'active-link' : 'text-white'}`} 
                  onClick={() => handleSetActive('/post/categories')}
                >
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/post/index" 
                  className={`nav-link ${activeLink === '/post/index' ? 'active-link' : 'text-white'}`} 
                  onClick={() => handleSetActive('/post/index')}
                >
                  Post Index
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item mb-2">
          <a 
            href="#" 
            onClick={() => {
              togglePodcast();
              handleSetActive('podcast');
            }} 
            className={`nav-link ${activeLink === 'podcast' ? 'active-link' : 'text-white'} d-flex justify-content-between align-items-center`}
          >
            Podcast
            <span>{podcastOpen ? '▾' : '▸'}</span>
          </a>
          {podcastOpen && (
            <ul className="nav flex-column ml-3 pl-3" style={{ borderLeft: '1px solid #ffffff33' }}>
              <li className="nav-item">
                <Link 
                  to="/podcast/author" 
                  className={`nav-link ${activeLink === '/podcast/author' ? 'active-link' : 'text-white'}`} 
                  onClick={() => handleSetActive('/podcast/author')}
                >
                  Author
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/podcast/categories" 
                  className={`nav-link ${activeLink === '/podcast/categories' ? 'active-link' : 'text-white'}`} 
                  onClick={() => handleSetActive('/podcast/categories')}
                >
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/podcast/index" 
                  className={`nav-link ${activeLink === '/podcast/index' ? 'active-link' : 'text-white'}`} 
                  onClick={() => handleSetActive('/podcast/index')}
                >
                  Podcast Index
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item mt-auto">
          <button 
            onClick={handleLogout} 
            className="nav-link text-white bg-dark border-0" 
            style={{ cursor: 'pointer' }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
