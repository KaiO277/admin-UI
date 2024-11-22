import api from './api';

const fetchAllPodcastCategoriesPagi = async (page = 1) => {
  try {
      // Sử dụng api.get thay cho fetch
      const response = await api.get(`/podcast/podcast_cate_get_all_api_pagi/?page=${page}`);
      return response.data;  // Trả về dữ liệu trực tiếp từ API response
  } catch (error) {
      console.error(error);  // In lỗi nếu có lỗi xảy ra
      throw error;  // Ném lại lỗi để xử lý ngoài component
  }
};

// Lấy tất cả PostAuthor
const fetchAllPodcastCategories = () => {
  return api.get('/podcast/podcast_cate_get_all_api/');
};

// Tạo mới PostAuthor
const podcastCreatePodcastCategories = (title) => {
  const formData = new FormData();
  formData.append('title', title);

  return api.post('/podcast/podcast_cate_add_api/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deletePodcastCategories = (id) => {
  return api.delete('/podcast/podcast_cate_delete_api/', {
    data: { id: id } 
  });
};

const updatePodcastCategories = ({ id, title }) => {
  return api.patch('/podcast/podcast_cate_update_api/', { id, title }); 
};

export { fetchAllPodcastCategories, fetchAllPodcastCategoriesPagi, podcastCreatePodcastCategories, deletePodcastCategories, updatePodcastCategories };

