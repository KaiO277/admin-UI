import React, { useState, useEffect } from 'react';
import { fetchAllUser, removeUserGP } from '../services/HomeService';
import UserTable from '../components/UserTable';
import ModalAddGP from '../components/ModalAddGP';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

function UserList() {
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isShowModalAddGP, setIsShowModalAddGP] = useState(false);

    const handleClose = () => {
        setIsShowModalAddGP(false);
    };

    const handleRemoveGroup = async (userId, groupId) => {
        if (!userId || !groupId) {
            toast.error("Please ensure both user and group are valid.");
            return;
        }

        try {
            const payload = { user_id: userId, group_id: groupId };
            console.log("Removing user from group:", payload);

            // Gọi API để xóa người dùng khỏi nhóm
            await removeUserGP(payload);
            toast.success("Group removed successfully!");
            await fetchUsers(); // Làm mới danh sách người dùng sau khi xóa
        } catch (error) {
            console.error("Error: ", error);
            toast.error("Failed to remove group. Please try again.");
        }
    };

    const handleSave = async () => {
        await fetchUsers();
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetchAllUser();
            setListUsers(res.data.users);
        } catch (err) {
            console.error("Error fetching users: ", err);
            setError("Failed to fetch users. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdate = (user) => {
        console.log("Update user", user);
    };

    return (
        <div className="container">
            <div className="headerName">
                <h1>Users List</h1>
                <Button className="btn btn-success" onClick={() => setIsShowModalAddGP(true)}>
                    Add
                </Button>
            </div>

            <UserTable
                listUsers={listUsers}
                loading={loading}
                error={error}
                onRemoveGroup={handleRemoveGroup}
                onUpdate={handleUpdate}
            />

            <ModalAddGP
                show={isShowModalAddGP}
                handleClose={handleClose}
                onSave={handleSave}
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
}

export default UserList;
