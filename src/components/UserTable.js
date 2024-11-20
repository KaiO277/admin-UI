import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UserTable = ({ listUsers, loading, error, onDelete, onUpdate }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Group</th>
                    <th>Actions</th> 
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 ? (
                    listUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                            {user.groups.length > 0
                                ? user.groups.map((group) => group.name).join(", ")
                                : "No groups"}
                            </td>
                            <td>
                                <Button variant="warning" onClick={() => onUpdate(user)}>Update</Button> 
                                <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button> 
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center">No authors found</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default UserTable;