import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreatePostAuthor, updatePostAuthor } from '../services/PostAuthorService'; // Đảm bảo bạn đã nhập hàm update
import { toast } from 'react-toastify';

function ModalAddNew(props) {
    const { show, handleClose, onSave, currentUser } = props;
    const [name, setName] = useState('');
    const isUpdate = Boolean(currentUser); // Kiểm tra xem có đang ở chế độ cập nhật không

    useEffect(() => {
        // Nếu có currentUser, điền vào tên
        if (currentUser) {
            setName(currentUser.name);
        } else {
            setName(''); // Reset cho chế độ thêm mới
        }
    }, [currentUser]);

    const handleSave = async () => {
        try {
            if (isUpdate) {
                // Cập nhật tác giả
                await updatePostAuthor({ id: currentUser.id, name }); 
                toast.success("Author updated successfully!");
            } else {
                // Tạo tác giả mới
                await postCreatePostAuthor(name);
                toast.success("A user is created successfully!");
            }
            handleClose();
            setName('');
            onSave(); // Gọi hàm onSave để làm mới danh sách
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isUpdate ? 'Update Author' : 'Add New Author'}</Modal.Title>
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

export default ModalAddNew;
