import api from './api';


// Lấy tất cả PostAuthor
const fetchAllPostAuthor = () => {
  return api.get('/post/post_author_get_all_api/');
};

// Tạo mới PostAuthor
const postCreatePostAuthor = (name) => {
  const formData = new FormData();
  formData.append('name', name);

  return api.post('/post/post_author_add_api/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deletePostAuthor = (id) => {
  return api.delete('/post/post_author_delete_api/', {
    data: { id: id } // Gửi dữ liệu trong thân yêu cầu
  });
};

const updatePostAuthor = ({ id, name }) => {
  return api.patch('/post/post_author_update_api/', { id, name }); // Sử dụng phương thức PUT
};

export { fetchAllPostAuthor, postCreatePostAuthor,  deletePostAuthor ,updatePostAuthor };

