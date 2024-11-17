import api from './api';

const fetchAllPostCategoriesPagi = () => {
  return api.get('/post/post_cate_get_all_api_pagi/');
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

