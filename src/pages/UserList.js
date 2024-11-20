import React, { useState, useEffect } from 'react';
import {fetchAllUser} from '../services/HomeService'
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
        // setCurrentUser(null); // Reset currentUser khi đóng modal
    };

    const handleUpdate = (user) => {
        // setCurrentUser(user);
        // setIsShowModalAddNew(true); 
    };

    const handleSave = async () => {
        await fetchUsers(); 
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetchAllUser();
            setListUsers(res.data.users);
        } catch (err) {
            setError('Failed to fetch authors. Please try again later.');
        } finally {
            setLoading(false);
        }
      };

      useEffect(() => {
        fetchUsers();
      }, []);

      console.log(listUsers)

  return (
    <div className='container'>
        <div className='headerName'>
            <h1>Users List</h1>
            <Button className='btn btn-success' onClick={() => setIsShowModalAddGP(true)}>Add</Button>
        </div>

        <UserTable
                listUsers={listUsers} 
                loading={loading} 
                error={error} 
                // onDelete={handleDelete} 
                // onUpdate={handleUpdate} 
            />
        <ModalAddGP 
                show={isShowModalAddGP}
                handleClose={handleClose}
                onSave={handleSave}
                // currentUser={currentUser}
        />
        <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                closeOnClick 
                draggable 
        />
    </div>
  )
}

export default UserList
