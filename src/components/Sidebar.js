import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const navigate = useNavigate(); 
  const [postOpen, setPostOpen] = useState(false);
  const [podcastOpen, setPodcastOpen] = useState(false);

  const togglePost = () => setPostOpen(!postOpen);
  const togglePodcast = () => setPodcastOpen(!podcastOpen);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login'); 
  };

  return (
    <div className="bg-dark text-white p-3" style={{ height: '100vh', width: '200px' }}>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/home" className="nav-link text-white">Home</Link>
        </li>

        <li className="nav-item mb-2">
          <a href="#" onClick={togglePost} className="nav-link text-white d-flex justify-content-between align-items-center">
            Post
            <span>{postOpen ? '▾' : '▸'}</span>
          </a>
          {postOpen && (
            <ul className="nav flex-column ml-3 pl-3" style={{ borderLeft: '1px solid #ffffff33' }}>
              <li className="nav-item">
                <Link to="/post/author" className="nav-link text-white">Author</Link>
              </li>
              <li className="nav-item">
                <Link to="/post/categories" className="nav-link text-white">Categories</Link>
              </li>
              <li className="nav-item">
                <Link to="/post/index" className="nav-link text-white">Post Index</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item mb-2">
          <a href="#" onClick={togglePodcast} className="nav-link text-white d-flex justify-content-between align-items-center">
            Podcast
            <span>{podcastOpen ? '▾' : '▸'}</span>
          </a>
          {podcastOpen && (
            <ul className="nav flex-column ml-3 pl-3" style={{ borderLeft: '1px solid #ffffff33' }}>
              <li className="nav-item">
                <Link to="/podcast/author" className="nav-link text-white">Author</Link>
              </li>
              <li className="nav-item">
                <Link to="/podcast/categories" className="nav-link text-white">Categories</Link>
              </li>
              <li className="nav-item">
                <Link to="/podcast/index" className="nav-link text-white">Podcast Index</Link>
              </li>
            </ul>
          )}
        </li>

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
