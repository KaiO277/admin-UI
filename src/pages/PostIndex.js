import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ModalAddPostIndex from '../components/ModalAddPostIndex';
import './PostAuthor.scss';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPostIndex, deletePostIndex } from '../services/PostIndexService';
import Pagination from 'react-bootstrap/Pagination'; // Import Pagination from react-bootstrap
import PostIndexTable from '../components/PostIndexTable';

const PostIndex = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listPostIndex, setListPostIndex] = useState([]); // Đổi tên thành listPostIndex
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPostIndex, setCurrentPostIndex] = useState(null);

    // Trạng thái phân trang
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(4); // Số mục mỗi trang

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setCurrentPostIndex(null); 
    };

    const handleDelete = async (id) => {
        try {
            await deletePostIndex(id);
            fetchPostIndexes(); // Sau khi xóa, gọi lại API để lấy dữ liệu mới
            toast.success("Post Index deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete post index.");
        }
    };

    const handleUpdate = (postIndex) => {
        setCurrentPostIndex(postIndex);
        setIsShowModalAddNew(true); 
    };

    const handleSave = async () => {
        await fetchPostIndexes(); 
    };

    const fetchPostIndexes = async () => {
        setLoading(true);
        try {
            // Gọi API với tham số page
            const res = await fetchAllPostIndex(activePage);
            setListPostIndex(res.data); // Lưu dữ liệu
            setTotalPages(Math.ceil(res.totalRows / limit)); // Tính tổng số trang
        } catch (err) {
            setError('Failed to fetch post indexes. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    // console.log(listPostIndex.data);
    
    useEffect(() => {
        fetchPostIndexes(); // Fetch dữ liệu khi component được mount
    }, [activePage]); // Fetch lại khi activePage thay đổi

    // Hàm xử lý thay đổi trang
    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (
        <div className='container'>
            <div className='headerName'>
                <h1>List Post</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>

            {/* Hiển thị bảng Post Index */}
            <PostIndexTable
                listPostIndex={listPostIndex} // Sử dụng listPostIndex thay vì listUsers
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
            <ModalAddPostIndex 
                show={isShowModalAddNew}
                handleClose={handleClose}
                onSave={handleSave}
                currentPostIndex={currentPostIndex} // Đảm bảo truyền đúng dữ liệu
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

export default PostIndex;
