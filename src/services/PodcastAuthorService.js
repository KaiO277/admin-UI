import api from './api';


// Lấy tất cả PostAuthor
const fetchAllPodcastAuthor = () => {
  return api.get('/podcast/podcast_author_get_all_api/');
};

const fetchAllPodcastAuthorPagi = async (page = 1) => {
  try {
      // Sử dụng api.get thay cho fetch
      const response = await api.get(`/podcast/podcast_cate_get_list_page_all_api/?page=${page}`);
      return response.data;  // Trả về dữ liệu trực tiếp từ API response
  } catch (error) {
      console.error(error);  // In lỗi nếu có lỗi xảy ra
      throw error;  // Ném lại lỗi để xử lý ngoài component
  }
};

// Tạo mới PostAuthor
const podcastCreatePodcastAuthor = (name) => {
  const formData = new FormData();
  formData.append('name', name);

  return api.post('/podcast/podcast_author_add_api/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deletePodcastAuthor = (id) => {
  return api.delete('/podcast/podcast_author_delete_api/', {
    data: { id: id } // Gửi dữ liệu trong thân yêu cầu
  });
};

const updatePodcastAuthor = ({ id, name }) => {
  return api.patch('/podcast/podcast_author_update_api/', { id, name }); // Sử dụng phương thức PUT
};

export { fetchAllPodcastAuthor, fetchAllPodcastAuthorPagi, podcastCreatePodcastAuthor, deletePodcastAuthor, updatePodcastAuthor };

