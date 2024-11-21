import React, { useState, useEffect } from 'react';
import PostAuthorTable from '../components/PostAuthorTable';
import Button from 'react-bootstrap/Button';
import ModalAddNew from '../components/ModalAddNew';
import './PostAuthor.scss';
import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPostAuthor, deletePostAuthor } from '../services/PostAuthorService';

const PostAuthor = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    // Pagination state
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setCurrentUser(null);
    };

    const handleDelete = async (id) => {
        try {
            await deletePostAuthor(id);
            fetchUsers(activePage); // Reload current page
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
        await fetchUsers(activePage); // Reload current page
    };

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetchAllPostAuthor(page);
            const total = res.totalRows || 0;
            const size = res.page_size || 4;
            const currentPage = res.current_page || 1;
            setListUsers(res.data || []);
            setActivePage(currentPage);
            setTotalPages(Math.ceil(total / size));
        } catch (err) {
            setError('Failed to fetch authors. Please try again later.');
            setListUsers([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handlePageChange = (page) => {
        if (page !== activePage) {
            fetchUsers(page);
        }
    };

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

            {/* Pagination */}
            <Pagination className="justify-content-center">
                <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={activePage === 1}
                />
                <Pagination.Prev
                    onClick={() => handlePageChange(activePage - 1)}
                    disabled={activePage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === activePage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(activePage + 1)}
                    disabled={activePage === totalPages}
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={activePage === totalPages}
                />
            </Pagination>

            <ModalAddNew 
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

export default PostAuthor;
