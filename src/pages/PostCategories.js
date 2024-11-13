import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ModalAddPostCate from '../components/ModalAddPostCate';
import './PostAuthor.scss'
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPostCategories, deletePostCategories } from '../services/PostCategoriesService';
import PostCategoriesTable from '../components/PostCategoriesTable';

const PostCategories = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setCurrentUser(null); // Reset currentUser khi đóng modal
    };

    const handleDelete = async (id) => {
        try {
            await deletePostCategories(id);
            fetchUsers();
            toast.success("User deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete user.");
        }
    };

    const handleUpdate = (user) => {
        setCurrentUser(user);
        setIsShowModalAddNew(true); // Mở modal để cập nhật
    };

    const handleSave = async () => {
        await fetchUsers(); // Gọi lại hàm fetchUsers để cập nhật danh sách
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetchAllPostCategories();
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
                <h1>Categries</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>
            <PostCategoriesTable
                listUsers={listUsers } 
                loading={loading} 
                error={error} 
                onDelete={handleDelete} 
                onUpdate={handleUpdate} 
            />
            <ModalAddPostCate 
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

export default PostCategories;
