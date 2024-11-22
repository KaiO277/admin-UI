import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ModalAddPostCate from '../components/ModalAddPostCate';
import './PostAuthor.scss';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPostCategoriesPagi, deletePostCategories } from '../services/PostCategoriesService';
import Pagination from 'react-bootstrap/Pagination';
import PostCategoriesTable from '../components/PostCategoriesTable';

const PostCategories = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listCategories, setListCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentCategory, setCurrentCategory] = useState(null);

    // Trạng thái phân trang
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(4); // Số mục mỗi trang

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setCurrentCategory(null); // Reset khi đóng modal
    };

    const handleDelete = async (id) => {
        try {
            await deletePostCategories(id);
            fetchCategories(); // Gọi lại API sau khi xóa
            toast.success("Category deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete category.");
        }
    };

    const handleUpdate = (category) => {
        setCurrentCategory(category);
        setIsShowModalAddNew(true); // Mở modal để cập nhật
    };

    const handleSave = async () => {
        await fetchCategories(); // Cập nhật danh sách sau khi lưu
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetchAllPostCategoriesPagi(activePage); // Lấy dữ liệu theo trang
            setListCategories(res.data); // Cập nhật danh sách
            setTotalPages(Math.ceil(res.totalRows / res.page_size)); // Tính tổng số trang
        } catch (err) {
            setError('Failed to fetch categories. Please try again later.');
        } finally {
            setLoading(false);
        } 
    };
    console.log(listCategories)

    useEffect(() => {
        fetchCategories(); // Lấy dữ liệu khi component được mount
    }, [activePage]); // Fetch lại dữ liệu khi trang thay đổi

    // Hàm xử lý thay đổi trang
    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (
        <div className='container'>
            <div className='headerName'>
                <h1>Post Categories</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>

            {/* Hiển thị bảng Categories */}
            <PostCategoriesTable
                listCategories={listCategories} // Đổi tên biến cho đúng
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

            {/* Modal Add New */}
            <ModalAddPostCate 
                show={isShowModalAddNew}
                handleClose={handleClose}
                onSave={handleSave}
                currentCategory={currentCategory} // Đảm bảo truyền đúng dữ liệu
            />

            {/* Toast Notification */}
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
