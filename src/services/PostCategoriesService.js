import api from './api';

// Lấy tất cả PostAuthor
const fetchAllPostCategoriesPagi = async (page = 1) => {
  try {
      // Sử dụng api.get thay cho fetch
      const response = await api.get(`/post/post_cate_get_list_page_all_api/?page=${page}`);
      return response.data;  // Trả về dữ liệu trực tiếp từ API response
  } catch (error) {
      console.error(error);  // In lỗi nếu có lỗi xảy ra
      throw error;  // Ném lại lỗi để xử lý ngoài component
  }
};

// Lấy tất cả PostAuthor
const fetchAllPostCategories = () => {
  return api.get('/post/post_cate_get_all_api/');
};

// Tạo mới PostAuthor
const postCreatePostCategories = (title) => {
  const formData = new FormData();
  formData.append('title', title);

  return api.post('/post/post_cate_add_api/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deletePostCategories = (id) => {
  return api.delete('/post/post_cate_delete_api/', {
    data: { id: id } 
  });
};

const updatePostCategories = ({ id, title }) => {
  return api.patch('/post/post_cate_update_api/', { id, title }); 
};

export { 
  fetchAllPostCategories, 
  fetchAllPostCategoriesPagi, 
  postCreatePostCategories, 
  deletePostCategories, 
  updatePostCategories 
};

