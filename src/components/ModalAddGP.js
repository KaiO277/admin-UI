import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postUserGP, fetchAllListUsers, fetchAllListGroup } from '../services/HomeService';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { toast } from 'react-toastify';

function ModalAddGP(props) {
    const { show, handleClose, onSave } = props;
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [listUsers, listGroups] = await Promise.all([
                    fetchAllListUsers(),
                    fetchAllListGroup()
                ]);
                setUsers(listUsers.data.users);
                setGroups(listGroups.data.groups);
            } catch (error) {
                console.error("Error fetching data: ", error);
                toast.error("Failed to load users or groups");
            }
        };
        loadData();
    }, []);

    const handleSave = async () => {
        if (!selectedUser || !selectedGroup) {
            toast.error("Please select a user and a group.");
            return;
        }
    
        try {
            // Gửi dữ liệu tới API
            const payload = {
                user_id: selectedUser.id,
                group_id: selectedGroup.id,
            };
            await postUserGP(payload); // Hàm `postUserGP` gọi API với `payload`
            toast.success("User added to group successfully!");
            handleClose(); // Đóng modal
            onSave(); // Làm mới danh sách sau khi lưu thành công
        } catch (error) {
            console.error("Error: ", error);
            toast.error("Failed to add user to group.");
        }
    };
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add User to Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    <div className='mb-3'>
                        <label className="form-label">Username</label>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={selectedUser ? selectedUser.username : "Select a username"}
                        >
                            {users.map((user) => (
                                <Dropdown.Item 
                                    key={user.id} 
                                    onClick={() => setSelectedUser(user)}
                                >
                                    {user.username}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <div className='mb-3'>
                        <label className="form-label">Group</label>
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={selectedGroup ? selectedGroup.name : "Select a group name"}
                        >
                            {groups.map((group) => (
                                <Dropdown.Item 
                                    key={group.id} 
                                    onClick={() => setSelectedGroup(group)}
                                >
                                    {group.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                </div>
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

export default ModalAddGP;
