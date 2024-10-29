import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { podcastCreatePodcastAuthor, updatePodcastAuthor } from '../services/PodcastAuthorService'; 
import { toast } from 'react-toastify';

function ModalAddPodcastAuthor(props) {
    const { show, handleClose, onSave, currentUser } = props;
    const [name, setName] = useState('');
    const isUpdate = Boolean(currentUser); 

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
        } else {
            setName(''); 
        }
    }, [currentUser]);

    const handleSave = async () => {
        try {
            if (isUpdate) {
                await updatePodcastAuthor({ id: currentUser.id, name }); 
                toast.success("Author updated successfully!");
            } else {
                await podcastCreatePodcastAuthor(name);
                toast.success("Author is created successfully!");
            }
            handleClose();
            setName('');
            onSave(); 
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isUpdate ? 'Update Author Podcast' : 'Add New Author Podcast'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    <div className='mb-3'>
                        <label className="form-label">Name</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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

export default ModalAddPodcastAuthor;
