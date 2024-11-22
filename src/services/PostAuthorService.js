import api from './api';


// Lấy tất cả PostAuthor
const fetchAllPostAuthor = async (page = 1) => {
  try {
      // Sử dụng api.get thay cho fetch
      const response = await api.get(`/post/post_author_get_list_page_all_api/?page=${page}`);
      return response.data;  // Trả về dữ liệu trực tiếp từ API response
  } catch (error) {
      console.error(error);  // In lỗi nếu có lỗi xảy ra
      throw error;  // Ném lại lỗi để xử lý ngoài component
  }
};

const fetchAllPostAuthorList = () => {
  return api.get('post/post_author_get_all_api/');
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

export { 
  fetchAllPostAuthor, 
  postCreatePostAuthor,  
  deletePostAuthor,
  updatePostAuthor,
  fetchAllPostAuthorList //dùng để phân trang
};

