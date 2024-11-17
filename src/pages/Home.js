import React, { useState, useEffect } from 'react';
import './Home.scss'
import {fetchAllUser} from '../services/HomeService'
import {fetchAllPodcastIndex} from '../services/PodcastIndexService'
import {fetchAllPostIndex} from '../services/PostIndexService'

function Home() {
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [listPodcast, setListPodcast] = useState([]);
  const [listPost, setListPost] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
        const res = await fetchAllUser();
        setListUsers(res.data);
    } catch (err) {
        setError('Failed to fetch authors. Please try again later.');
    } finally {
        setLoading(false);
    }
  };

  const fetchPodcast = async () =>{
    setLoading(true);
    try{
      const res = await fetchAllPodcastIndex();
      setListPodcast(res.data);
    }catch (err){
      setError('Failed to fetch podcast. Please try again later.');
    }finally{
      setLoading(false)
    }
  } 

  const fetchPost = async () =>{
    setLoading(true);
    try{
      const res = await fetchAllPostIndex();
      setListPost(res.data);
    }catch (err){
      setError('Failed to fetch podcast. Please try again later.');
    }finally{
      setLoading(false)
    }
  } 

  useEffect(() => {
    fetchUsers();
    fetchPodcast();
    fetchPost();
  }, []);

  return (
    <div className='container'>
      <div className="row g-4 mb-4">
      {/* Card 1 */}
      <div className="col-xxl-3 col-xl-4 col-sm-6">
        <div className="card bg-primary text-white">
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">{listUsers.length}</div>
              <div>Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-xxl-3 col-xl-4 col-sm-6">
        <div className="card bg-info text-white">
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">{listPost.length}</div>
              <div>Post</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="col-xxl-3 col-xl-4 col-sm-6">
        <div className="card bg-warning text-white">
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">{listPodcast.length}</div>
              <div>Podcast</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="col-xxl-3 col-xl-4 col-sm-6">
        <div className="card bg-danger text-white">
          <div className="card-body pb-0 d-flex justify-content-between align-items-start">
            <div>
              <div className="fs-4 fw-semibold">3.200</div>
              <div>Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
