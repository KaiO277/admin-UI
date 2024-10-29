import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ModalAddPostIndex from '../components/ModalAddPostIndex';
import './PostAuthor.scss'
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPostIndex, deletePostIndex } from '../services/PostIndexService';
import PostIndexTable from '../components/PostIndexTable';

const PostIndex = () => {
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
            await deletePostIndex(id);
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
            const res = await fetchAllPostIndex();
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
                <h1>Danh Mục Bài Viết</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>
            <PostIndexTable
                listUsers={listUsers} 
                loading={loading} 
                error={error} 
                onDelete={handleDelete} 
                onUpdate={handleUpdate} 
            />
            <ModalAddPostIndex 
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

export default PostIndex;
