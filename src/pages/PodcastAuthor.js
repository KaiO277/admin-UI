import React, { useState, useEffect } from 'react';
import PostAuthorTable from '../components/PodcastAuthorTable';
import Button from 'react-bootstrap/Button';
import ModalAddPodcastAuthor from '../components/ModalAddPodcastAuthor';
import './PostAuthor.scss'
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPodcastAuthor, deletePodcastAuthor } from '../services/PodcastAuthorService';

const PodcastAuthor = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setCurrentUser(null); 
    };

    const handleDelete = async (id) => {
        try {
            await deletePodcastAuthor(id);
            fetchUsers();
            toast.success("User deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete user.");
        }
    };

    const handleUpdate = (user) => {
        setCurrentUser(user);
        setIsShowModalAddNew(true); 
    };

    const handleSave = async () => {
        await fetchUsers(); 
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetchAllPodcastAuthor();
            setListUsers(res.data);
        } catch (err) {
            setError('Failed to fetch authors. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='container'>
            <div className='headerName'>
                <h1>Author</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>
            <PostAuthorTable 
                listUsers={listUsers} 
                loading={loading} 
                error={error} 
                onDelete={handleDelete} 
                onUpdate={handleUpdate} 
            />
            <ModalAddPodcastAuthor 
                show={isShowModalAddNew}
                handleClose={handleClose}
                onSave={handleSave}
                currentUser={currentUser}
            />
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                closeOnClick 
                draggable 
            />
        </div>
    );
};

export default PodcastAuthor;
