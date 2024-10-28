import axios from 'axios';

// Khởi tạo axios với baseURL và các cấu hình mặc định
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm access token vào headers khi gọi API
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Làm mới access token nếu token hiện tại hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra lỗi 401 và kiểm soát không tạo vòng lặp yêu cầu lặp lại
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đặt cờ để tránh lặp lại yêu cầu vô hạn
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          // Gọi endpoint làm mới token
          const response = await axios.post(
            'http://127.0.0.1:8000/api/auth/refresh/', 
            { refresh: refreshToken }
          );

          // Lưu token mới vào localStorage
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh || refreshToken);

          // Gán access token mới vào yêu cầu ban đầu
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

          // Thực hiện lại yêu cầu ban đầu
          return api(originalRequest);
        } catch (err) {
          // Xóa token và chuyển đến trang login nếu làm mới không thành công
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(err);
        }
      } else {
        // Nếu không có refresh token, chuyển hướng về login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
