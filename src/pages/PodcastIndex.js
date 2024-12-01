import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import ModalAddPodcastIndex from '../components/ModalAddPodcastIndex';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAllPodcastIndexPagi, deletePodcastIndex } from '../services/PodcastIndexService';
import PodcastIndexTable from '../components/PodcastIndexTable';

const PodcastIndex = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [podcastList, setPodcastList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPodcast, setCurrentPodcast] = useState(null);

    // Pagination state
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setCurrentPodcast(null);
    };

    const handleDelete = async (id) => {
        try {
            await deletePodcastIndex(id);
            fetchPodcasts(activePage); // Reload current page
            toast.success("Podcast deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete podcast.");
        }
    };

    const handleUpdate = (podcast) => {
        setCurrentPodcast(podcast);
        setIsShowModalAddNew(true);
    };

    const handleSave = async () => {
        await fetchPodcasts(activePage); // Reload current page
    };

    const fetchPodcasts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetchAllPodcastIndexPagi(page);
            const total = res.totalRows || 0;
            const size = res.page_size || 4;
            const currentPage = res.current_page || 1;
            setPodcastList(res.data || []);
            setActivePage(currentPage);
            setTotalPages(Math.ceil(total / size));
        } catch (err) {
            setError('Failed to fetch podcasts. Please try again later.');
            setPodcastList([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPodcasts();
    }, []);

    const handlePageChange = (page) => {
        if (page !== activePage) {
            fetchPodcasts(page);
        }
    };

    return (
        <div className='container'>
            <div className='headerName'>
                <h1>Podcast List</h1>
                <Button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add</Button>
            </div>
            <PodcastIndexTable 
                podcastList={podcastList} 
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

            <ModalAddPodcastIndex 
                show={isShowModalAddNew}
                handleClose={handleClose}
                onSave={handleSave}
                currentPodcast={currentPodcast}
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

export default PodcastIndex;
