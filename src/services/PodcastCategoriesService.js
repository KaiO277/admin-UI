import api from './api';

const fetchAllPodcastCategoriesPagi = (page, limit) => {
  return api.get(`/podcast/podcast_cate_get_all_api_pagi/?page=${page}&limit=${limit}`);
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

