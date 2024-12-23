import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import { fetchAllPostCategories } from '../services/PostCategoriesService';
import { fetchAllPostAuthorList } from '../services/PostAuthorService';
import { postCreatePostIndex, updatePostIndex } from '../services/PostIndexService';
import { toast } from 'react-toastify';
import JoditEditor from "jodit-react";

function ModalAddPostIndex({ show, handleClose, onSave, currentPostIndex }) {
    const [title, setTitle] = useState('');
    const [textShort, setTextShort] = useState('');
    const [textLong, setTextLong] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const editor = useRef(null);

    const resetForm = () => {
        setTitle('');
        setTextShort('');
        setTextLong('');
        setImage(null);
        setSelectedCategory(null);
        setSelectedAuthor(null);
    };

    useEffect(() => {
        if (currentPostIndex) {
            setTitle(currentPostIndex.title || '');
            setTextShort(currentPostIndex.text_short || '');
            setTextLong(currentPostIndex.text_long || '');
            setImage(currentPostIndex.image_title || null);
            setSelectedCategory(currentPostIndex.post_cate || null);
            setSelectedAuthor(currentPostIndex.post_author || null);
        } else {
            resetForm();
        }
    }, [currentPostIndex]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [categoriesResponse, authorsResponse] = await Promise.all([
                    fetchAllPostCategories(),
                    fetchAllPostAuthorList()
                ]);
                setCategories(categoriesResponse.data);
                setAuthors(authorsResponse.data);
            } catch (error) {
                toast.error("Failed to load categories or authors");
            }
        };
        loadData();
    }, []);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSave = async () => {
        if (!title || !textLong || !selectedCategory || !selectedAuthor || (!image && !currentPostIndex?.image_title)) {
            toast.error("Please fill in all fields");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('text_short', textShort);
        formData.append('text_long', textLong);
        formData.append('image_title', image || currentPostIndex?.image_title);
        formData.append('post_cate_id', selectedCategory.id);
        formData.append('post_author_id', selectedAuthor.id);

        try {
            if (currentPostIndex) {
                await updatePostIndex(currentPostIndex.id, formData);
                toast.success("Post updated successfully!");
            } else {
                await postCreatePostIndex(formData);
                resetForm();
                toast.success("Post created successfully!");
            }
            handleClose();
            onSave();
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{currentPostIndex ? "Update Post" : "Add New Post"}</Modal.Title>
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
                        <label className="form-label">Short Text</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            value={textShort}
                            onChange={(e) => setTextShort(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Category</label>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={selectedCategory ? selectedCategory.title : "Select a category"}
                        >
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <Dropdown.Item 
                                        key={category.id} 
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category.title}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled>No categories available</Dropdown.Item>
                            )}
                        </DropdownButton>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Author</label>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={selectedAuthor ? selectedAuthor.name : "Select an author"}
                        >
                            {authors.length > 0 ? (
                                authors.map((author) => (
                                    <Dropdown.Item 
                                        key={author.id} 
                                        onClick={() => setSelectedAuthor(author)}
                                    >
                                        {author.name}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled>No authors available</Dropdown.Item>
                            )}
                        </DropdownButton>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Long Text</label>
                        <JoditEditor
                            ref={editor}
                            value={textLong}
                            onChange={(newContent) => setTextLong(newContent)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Image</label>
                        <input 
                            type='file' 
                            className='form-control' 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {currentPostIndex ? "Update Post" : "Save Changes"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddPostIndex;
