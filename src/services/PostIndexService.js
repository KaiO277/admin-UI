import api from './api';


const fetchAllPostIndex = async (page = 1) => {
  try {
      // Sử dụng api.get thay cho fetch
      const response = await api.get(`/post/post_index_get_list_page_all_api/?page=${page}`);
      return response.data;  // Trả về dữ liệu trực tiếp từ API response
  } catch (error) {
      console.error(error);  // In lỗi nếu có lỗi xảy ra
      throw error;  // Ném lại lỗi để xử lý ngoài component
  }
};


const postCreatePostIndex = async (formData) => {
  try {
    const response = await api.post('/post/post_index_add_api/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error creating post index:", error);
    throw error; 
  }
};

const deletePostIndex = (id) => {
  return api.delete('/post/post_index_delete_api/', {
    data: { id: id } 
  });
};

const updatePostIndex = async (id, formData) => {
  formData.append('id', id);  // Add the ID directly to formData

  try {
    const response = await api.patch('/post/post_index_update_api/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating post index:", error);
    throw error;
  }
};



export { fetchAllPostIndex, postCreatePostIndex, deletePostIndex, updatePostIndex };
