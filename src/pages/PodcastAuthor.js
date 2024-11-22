import React, { useState, useEffect } from 'react';
import PostAuthorTable from '../components/PodcastAuthorTable';
import Button from 'react-bootstrap/Button';
import ModalAddPodcastAuthor from '../components/ModalAddPodcastAuthor';
import './PostAuthor.scss';
import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPodcastAuthorPagi, deletePodcastAuthor } from '../services/PodcastAuthorService';

const PodcastAuthor = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listAuthors, setListAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentAuthor, setCurrentAuthor] = useState(null);

    // Trạng thái phân trang
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(4); // Số mục mỗi trang

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setCurrentAuthor(null); // Reset khi đóng modal
    };

    const handleDelete = async (id) => {
        try {
            await deletePodcastAuthor(id);
            fetchAuthors(); // Tải lại dữ liệu sau khi xóa
            toast.success("Author deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete author.");
        }
    };

    const handleUpdate = (author) => {
        setCurrentAuthor(author);
        setIsShowModalAddNew(true); // Mở modal để cập nhật
    };

    const handleSave = async () => {
        await fetchAuthors(); // Tải lại dữ liệu sau khi thêm/cập nhật
    };

    const fetchAuthors = async () => {
        setLoading(true);
        try {
            const res = await fetchAllPodcastAuthorPagi(activePage); // Gọi API với trang hiện tại
            setListAuthors(res.data); // Cập nhật danh sách tác giả
            setTotalPages(Math.ceil(res.totalRows / res.page_size)); // Tính tổng số trang
        } catch (err) {
            setError('Failed to fetch authors. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors(); // Lấy dữ liệu khi component được mount
    }, [activePage]); // Tải lại dữ liệu khi trang thay đổi

    // Hàm xử lý thay đổi trang
    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (
        <div className='container'>
            <div className='headerName'>
                <h1>Podcast Authors</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>

            {/* Hiển thị bảng Podcast Authors */}
            <PostAuthorTable 
                listAuthors={listAuthors} // Đổi tên biến
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
            <ModalAddPodcastAuthor 
                show={isShowModalAddNew}
                handleClose={handleClose}
                onSave={handleSave}
                currentAuthor={currentAuthor} // Truyền dữ liệu hiện tại cho modal
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

export default PodcastAuthor;
