import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import ModalAddPostCate from '../components/ModalAddPodcastCate';
import './PostAuthor.scss';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPodcastCategoriesPagi, deletePodcastCategories } from '../services/PodcastCategoriesService';
import PodcastCategoriesTable from '../components/PodcastCategoriesTable';
import Pagination from 'react-bootstrap/Pagination';

const PodcastCategories = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);
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
            await deletePodcastCategories(id);
            await fetchCategories(); // Tải lại danh sách sau khi xóa
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
        await fetchCategories(); // Tải lại danh sách sau khi thêm/cập nhật
    };

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(''); // Xóa lỗi trước khi tải mới

        try {
            const res = await fetchAllPodcastCategoriesPagi(activePage, limit);
            setCategoriesList(res.data); // Lưu danh sách thể loại
            setTotalPages(Math.ceil(res.totalRows / res.page_size)); // Cập nhật tổng số trang
        } catch (err) {
            setError('Failed to fetch categories. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [activePage, limit]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Hàm xử lý thay đổi trang
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setActivePage(page);
        }
    };

    return (
        <div className='container'>
            <div className='headerName'>
                <h1>Podcast Categories</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>

            {/* Bảng hiển thị danh sách thể loại */}
            {error && <div className="text-danger text-center my-3">{error}</div>}
            <PodcastCategoriesTable
                categoriesList={categoriesList}
                loading={loading}
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

            {/* Modal thêm hoặc cập nhật */}
            <ModalAddPostCate
                show={isShowModalAddNew}
                handleClose={handleClose}
                onSave={handleSave}
                currentCategory={currentCategory}
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

export default PodcastCategories;
