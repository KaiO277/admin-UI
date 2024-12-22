import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { postUserGP, fetchAllListUsers, fetchAllListGroup } from '../services/HomeService';
import { toast } from 'react-toastify';

function ModalAddGP(props) {
    const { show, handleClose, onSave } = props;
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [inputUser, setInputUser] = useState("");
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

    const handleUserCheck = () => {
        const user = users.find((u) => u.username.toLowerCase() === inputUser.toLowerCase());
        if (user) {
            setSelectedUser(user);
            toast.success("User found!");
        } else {
            setSelectedUser(null);
            toast.error("User not found!");
        }
    };

    const handleSave = async () => {
        if (!selectedUser || !selectedGroup) {
            toast.error("Please ensure both user and group are valid.");
            return;
        }

        try {
            const payload = {
                user_id: selectedUser.id,
                group_id: selectedGroup.id,
            };
            await postUserGP(payload);
            toast.success("User added to group successfully!");
            handleClose();
            onSave();
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
                <div className="body-add-new">
                    {/* Input and Check for Username */}
                    <div className="mb-3 d-flex align-items-center">
                        <label className="form-label me-3" style={{ whiteSpace: "nowrap" }}>Username</label>
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Enter username"
                            value={inputUser}
                            onChange={(e) => setInputUser(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <Button variant="info" onClick={handleUserCheck}>
                            Check
                        </Button>
                    </div>
                    
                    {/* Dropdown for Group */}
                    <div className="mb-3">
                        <label className="form-label">Group</label>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={selectedGroup ? selectedGroup.name : "Select a group"}
                        >
                            {groups
                                .filter((group) => group.name.toLowerCase() !== "superadmin") // Lọc theo name
                                .map((group) => (
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
