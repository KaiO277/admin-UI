import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const PostAuthorTable = ({ listUsers, loading, error, onDelete, onUpdate }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th> {/* Thêm cột Actions */}
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 ? (
                    listUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>
                                <Button variant="warning" onClick={() => onUpdate(user)}>Update</Button> {/* Nút cập nhật */}
                                <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button> {/* Nút xóa */}
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

export default PostAuthorTable;
