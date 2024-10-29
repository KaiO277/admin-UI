import api from './api';

// Lấy tất cả PostAuthor
const fetchAllPostIndex = () => {
  return api.get('post/post_index_get_all_api/');
};

// Tạo mới PostIndex
const postCreatePostIndex = async (formData) => {
  try {
    const response = await api.post('post/post_index_add_api/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.error("Error creating post index:", error);
    throw error; // Ném lỗi để xử lý ở nơi khác
  }
};

const deletePostIndex = (id) => {
  return api.delete('post/post_index_delete_api/', {
    data: { id: id } // Gửi dữ liệu trong thân yêu cầu
  });
};

const updatePostIndex = ({ id, name }) => {
  return api.patch('post/post_index_update_api/', { id, name }); // Sử dụng phương thức PUT
};

export { fetchAllPostIndex, postCreatePostIndex, deletePostIndex, updatePostIndex };
