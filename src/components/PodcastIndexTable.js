import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import URL from '../services/ip';

const PodcastIndexTable = ({ listUsers, loading, error, onDelete, onUpdate }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cate Title</th>
                    <th>Author Name</th>
                    <th>Podcast Title</th>
                    <th>Audio</th>
                    <th>Image</th>
                    <th>Actions</th> 
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 ? (
                    listUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user?.podcast_cate?.title ? user.podcast_cate.title : null}</td>
                            <td>{user?.podcast_author?.name ? user.podcast_author.name : null}</td>
                            <td>{user.title}</td>
                            <td>{user.content}</td>
                            <td>
                                <img 
                                    src={`${URL}${user.image_title}`} 
                                    alt="Thumbnail" 
                                    style={{ width: '150px', height: 'auto', objectFit: 'cover' }}
                                />
                            </td>
                            <td>
                                <Button variant="warning" onClick={() => onUpdate(user)}>Update</Button> 
                                <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button> 
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

export default PodcastIndexTable;
