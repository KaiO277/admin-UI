import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreatePostCategories, updatePostCategories } from '../services/PostCategoriesService'; // Đảm bảo bạn đã nhập hàm update
import { toast } from 'react-toastify';

function ModalAddPostCate(props) {
    const { show, handleClose, onSave, currentUser } = props;
    const [title, setTitle] = useState('');
    const isUpdate = Boolean(currentUser); // Kiểm tra xem có đang ở chế độ cập nhật không

    useEffect(() => {
        // Nếu có currentUser, điền vào tên
        if (currentUser) {
            setTitle(currentUser.title);
        } else {
            setTitle(''); // Reset cho chế độ thêm mới
        }
    }, [currentUser]);

    const handleSave = async () => {
        try {
            if (isUpdate) {
                // Cập nhật tác giả
                await updatePostCategories({ id: currentUser.id, title }); 
                toast.success("Category updated successfully!");
            } else {
                // Tạo tác giả mới
                await postCreatePostCategories(title);
                toast.success("A Category is created successfully!");
            }
            handleClose();
            setTitle('');
            onSave(); // Gọi hàm onSave để làm mới danh sách
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.detail || error.message));
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
