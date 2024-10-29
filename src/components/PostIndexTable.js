import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import URL from '../services/ip';

const PostIndexTable = ({ listUsers, loading, error, onDelete, onUpdate }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cate Title</th>
                    <th>Author Name</th>
                    <th>Post Title</th>
                    <th>Text short</th>
                    <th>Text long</th>
                    <th>Actions</th> {/* Thêm cột Actions */}
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 ? (
                    listUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user?.post_cate?.title ? user.post_cate.title : null}</td>
                            <td>{user?.post_author?.name ? user.post_author.name : null}</td>
                            <td>{user.title}</td>
                            <td>{user.text_short}</td>
                            <td>
                                <img 
                                    src={`${URL}${user.image_title}`} // Đảm bảo đường dẫn bao gồm cả thư mục và tên file
                                    alt="Thumbnail" 
                                    style={{ width: '150px', height: 'auto', objectFit: 'cover' }}
                                />
                            </td>
                            <td>
                                <Button variant="warning" onClick={() => onUpdate(user)}>Update</Button> {/* Nút cập nhật */}
                                <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button> {/* Nút xóa */}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center">No categories found</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default PostIndexTable;
