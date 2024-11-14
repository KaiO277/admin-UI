import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import { fetchAllPodcastCategories } from '../services/PodcastCategoriesService';
import { fetchAllPodcastAuthor } from '../services/PodcastAuthorService';
import { postCreatePodcastIndex, updatePodcastIndex } from '../services/PodcastIndexService';
import { toast } from 'react-toastify';

function ModalAddPodcastIndex({ show, handleClose, onSave, currentUser }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(null);
    const [imageTitle, setImageTitle] = useState(null);  // Changed to imageTitle
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setTitle(currentUser.title || '');
            setSelectedCategory(currentUser.category || null);
            setSelectedAuthor(currentUser.author || null);
        } else {
            setTitle('');
            setImageTitle(null);
            setContent(null);
            setSelectedCategory(null);
            setSelectedAuthor(null);
        }
    }, [currentUser]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [categoriesResponse, authorsResponse] = await Promise.all([
                    fetchAllPodcastCategories(),
                    fetchAllPodcastAuthor()
                ]);
                setCategories(categoriesResponse.data);
                setAuthors(authorsResponse.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                toast.error("Failed to load categories or authors");
            }
        };
        loadData();
    }, []);

    const handleImageChange = (e) => {
        setImageTitle(e.target.files[0]);  // Changed to imageTitle
    };

    const handleContentChange = (e) => {
        setContent(e.target.files[0]);
    };

    const handleSave = async () => {
        if (!title || !content || !selectedCategory || !selectedAuthor || (!imageTitle && !currentUser?.image)) {
            toast.error("Please fill in all fields");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (imageTitle) formData.append('image_title', imageTitle);  // Changed to image_title
        formData.append('podcast_cate_id', selectedCategory.id);
        formData.append('podcast_author_id', selectedAuthor.id);

        console.log("FormData to be sent:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            if (currentUser) {
                formData.append('id', currentUser.id);
                await updatePodcastIndex(currentUser.id, formData);
                toast.success("Podcast updated successfully!");
            } else {
                await postCreatePodcastIndex(formData);
                toast.success("Podcast created successfully!");
            }

            handleClose();
            onSave(); 
        } catch (error) {
            console.error("Save Error:", error);
            const errorMsg = error.response?.data?.detail || error.response?.data?.message || error.message;
            toast.error("Error: " + errorMsg);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{currentUser ? "Update Podcast" : "Add New Podcast"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    <div className='mb-3'>
                        <label className="form-label">Title</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Category</label>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={selectedCategory ? selectedCategory.title : "Select a category"}
                        >
                            {categories.map((category) => (
                                <Dropdown.Item 
                                    key={category.id} 
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category.title}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Author</label>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={selectedAuthor ? selectedAuthor.name : "Select an author"}
                        >
                            {authors.map((author) => (
                                <Dropdown.Item 
                                    key={author.id} 
                                    onClick={() => setSelectedAuthor(author)}
                                >
                                    {author.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Image</label>
                        <input 
                            type='file' 
                            className='form-control' 
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Audio File</label>
                        <input 
                            type='file' 
                            className='form-control' 
                            accept="audio/*"
                            onChange={handleContentChange}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {currentUser ? "Update Podcast" : "Save Changes"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddPodcastIndex;
