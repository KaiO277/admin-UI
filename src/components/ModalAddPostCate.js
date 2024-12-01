import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreatePostCategories, updatePostCategories } from '../services/PostCategoriesService'; 
import { toast } from 'react-toastify';

function ModalAddPostCate(props) {
    const { show, handleClose, onSave, currentUser } = props;
    const [title, setTitle] = useState('');
    const isUpdate = Boolean(currentUser); 

    useEffect(() => {
        if (currentUser) {
            setTitle(currentUser.title);
        } else {
            setTitle(''); 
        }
    }, [currentUser]);

    const handleSave = async () => {
        try {
            if (isUpdate) {
                await updatePostCategories({ id: currentUser.id, title }); 
                toast.success("Category updated successfully!");
            } else {
                await postCreatePostCategories(title);
                toast.success("A Category is created successfully!");
            }
            handleClose();
            setTitle('');
            onSave(); 
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            toast.error("Error: " + errorMessage);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isUpdate ? 'Update Category' : 'Add New Category'}</Modal.Title>
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
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {isUpdate ? 'Update' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddPostCate;
