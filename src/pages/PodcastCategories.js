import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import ModalAddPostCate from '../components/ModalAddPodcastCate';
import './PostAuthor.scss';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPodcastCategoriesPagi, deletePodcastCategories } from '../services/PodcastCategoriesService';
import PostCategoriesTable from '../components/PostCategoriesTable';
import Pagination from 'react-bootstrap/Pagination'; // Import Pagination from react-bootstrap

const PodcastCategories = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    
    // Trạng thái phân trang
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(2); // Số mục mỗi trang

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setCurrentUser(null); // Reset currentUser khi đóng modal
    };

    const handleDelete = async (id) => {
        try {
            await deletePodcastCategories(id);
            fetchUsers();
            toast.success("Category deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete category.");
        }
    };

    const handleUpdate = (user) => {
        setCurrentUser(user);
        setIsShowModalAddNew(true); // Mở modal để cập nhật
    };

    const handleSave = async () => {
        await fetchUsers(); // Gọi lại hàm fetchUsers để cập nhật danh sách
    };

    // Sử dụng useCallback để tránh việc tái tạo lại hàm fetchUsers mỗi lần render
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        
        try {
            const res = await fetchAllPodcastCategoriesPagi(activePage, limit); // Sử dụng activePage và limit
            setListUsers(res.data);
            setTotalPages(Math.ceil(res.totalRows / res.page_size)); // Tính tổng số trang
        } catch (err) {
            setError('Failed to fetch categories. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [activePage, limit]); // fetchUsers chỉ thay đổi khi activePage hoặc limit thay đổi

    // Sử dụng useEffect để gọi API khi activePage thay đổi
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // Khi fetchUsers thay đổi, gọi lại useEffect

    // Hàm xử lý thay đổi trang
    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (
        <div className='container'>
            <div className='headerName'>
                <h1>Categories</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>

            <PostCategoriesTable
                listUsers={listUsers.data}
                loading={loading}
                error={error}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
            
            {/* Phân trang */}
            <Pagination className="justify-content-center">
                <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={activePage === 1}
                />
                <Pagination.Prev
                    onClick={() => handlePageChange(activePage - 1)}
                    disabled={activePage === 1}
                />
                {totalPages > 0 && [...Array(totalPages)].map((_, index) => (
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

export default PodcastCategories;
