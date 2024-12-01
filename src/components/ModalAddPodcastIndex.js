import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import { fetchAllPodcastCategories } from '../services/PodcastCategoriesService';
import { fetchAllPodcastAuthor } from '../services/PodcastAuthorService';
import { postCreatePodcastIndex, updatePodcastIndex } from '../services/PodcastIndexService';
import { toast } from 'react-toastify';

function ModalAddPodcastIndex({ show, handleClose, onSave, currentPodcast }) {
    const [title, setTitle] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    // Reset trạng thái
    const resetForm = () => {
        setTitle('');
        setAudioFile(null);
        setImageFile(null);
        setSelectedCategory(null);
        setSelectedAuthor(null);
    };

    // Load dữ liệu ban đầu
    useEffect(() => {
        const loadData = async () => {
            try {
                const [categoriesResponse, authorsResponse] = await Promise.all([ 
                    fetchAllPodcastCategories(),
                    fetchAllPodcastAuthor(),
                ]);
                setCategories(categoriesResponse.data || []);
                setAuthors(authorsResponse.data || []);
            } catch (error) {
                toast.error('Failed to load categories or authors');
            }
        };
        loadData();
    }, []);

    // Đặt giá trị ban đầu khi mở modal
    useEffect(() => {
        if (currentPodcast) {
            console.log("Editing podcast:", currentPodcast); // Debug xem giá trị currentPodcast
            setTitle(currentPodcast.title || '');
            setSelectedCategory(currentPodcast.podcast_cate || null);
            setSelectedAuthor(currentPodcast.podcast_author || null);
            setImageFile(null); // Reset ảnh tải lên (tránh ghi đè)
            setAudioFile(null); // Reset audio tải lên
        } else {
            resetForm();
        }
    }, [currentPodcast]);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleAudioChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const handleSave = async () => {
        if (!title || !selectedCategory || !selectedAuthor || (!imageFile && !currentPodcast?.image)) {
            toast.error('Please fill in all required fields');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        if (audioFile) formData.append('content', audioFile);
        if (imageFile) formData.append('image_title', imageFile);
        formData.append('podcast_cate_id', selectedCategory.id);
        formData.append('podcast_author_id', selectedAuthor.id);

        console.log([...formData.entries()]); // Debug dữ liệu gửi lên

        try {
            if (currentPodcast && currentPodcast.id) {
                // Cập nhật podcast nếu đã có id
                await updatePodcastIndex(currentPodcast.id, formData);
                toast.success('Podcast updated successfully!');
            } else {
                // Thêm mới podcast
                await postCreatePodcastIndex(formData);
                toast.success('Podcast created successfully!');
                resetForm();
            }
            handleClose();
            onSave(); // Reload data sau khi lưu
        } catch (error) {
            const errorMsg = error.response?.data?.detail || error.message;
            toast.error(`Error: ${errorMsg}`);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{currentPodcast ? 'Edit Podcast' : 'Add New Podcast'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <DropdownButton 
                            id="category" 
                            title={selectedCategory ? selectedCategory.title : "Select Category"} 
                            onSelect={(id) => setSelectedCategory(categories.find(c => c.id === id))}
                        >
                            {categories.map((category) => (
                                <Dropdown.Item key={category.id} eventKey={category.id}>
                                    {category.title}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <DropdownButton 
                            id="author" 
                            title={selectedAuthor ? selectedAuthor.name : "Select Author"} 
                            onSelect={(id) => setSelectedAuthor(authors.find(a => a.id === id))}
                        >
                            {authors.map((author) => (
                                <Dropdown.Item key={author.id} eventKey={author.id}>
                                    {author.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="audio" className="form-label">Audio</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="audio" 
                            onChange={handleAudioChange} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="image" 
                            onChange={handleImageChange} 
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddPodcastIndex;
