import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UserTable = ({ listUsers, loading, error, onRemoveGroup }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    // Lấy tên người dùng từ localStorage
    const currentUsername = localStorage.getItem('username');

    // Lọc danh sách người dùng, loại bỏ người dùng có tên đăng nhập trùng với `currentUsername`
    const filteredUsers = listUsers.filter(user => user.username !== currentUsername);

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
                {filteredUsers && filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
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
                                {user.groups.length > 0 ? (
                                    <Button
                                        variant="danger"
                                        onClick={() => onRemoveGroup(user.id, user.groups[0].id)}
                                    >
                                        Remove Group
                                    </Button>
                                ) : null}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No users found</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default UserTable;
