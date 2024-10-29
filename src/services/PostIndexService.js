import api from './api';


const fetchAllPostIndex = () => {
  return api.get('post/post_index_get_all_api/');
};


const postCreatePostIndex = async (formData) => {
  try {
    const response = await api.post('post/post_index_add_api/', formData, {
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
  return api.delete('post/post_index_delete_api/', {
    data: { id: id } 
  });
};

const updatePostIndex = async (id, formData) => {
  formData.append('id', id);  // Add the ID directly to formData

  try {
    const response = await api.patch('post/post_index_update_api/', formData, {
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
