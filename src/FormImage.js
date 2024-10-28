import React, { useState } from 'react';
import axios from 'axios';

const FormImage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    image: null
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]  // Chọn file đầu tiên từ input
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();  // Tạo FormData để gửi multipart/form-data
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    if (formData.image) {
      data.append('image', formData.image);  // Thêm file ảnh vào form data
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/try/try_add_api/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'  // Gửi đúng kiểu dữ liệu multipart
        }
      });
      setLoading(false);
      setMessage('Upload thành công!');
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setMessage('Upload thất bại. Vui lòng thử lại.');
      console.error("Error uploading file:", error.response ? error.response.data : error);
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <h2>Form Upload Ảnh</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Tin nhắn:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Chọn ảnh:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Đang tải...' : 'Gửi'}
        </button>
      </form>
      {message && <p style={{ color: message.includes('thành công') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default FormImage;
