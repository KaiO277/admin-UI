import api from './api'

const fetchAllUser = () =>{
    return api.get('user/user_get_list_all_api/')
}

const fetchAllListUsers = () => {
  return api.get("user/user_get_all_api/");
}

//group_get_all_api
const fetchAllListGroup = () => {
  return api.get("group/group_get_all_api/");
}

const postUserGP = async (data) => {
    const response = await api.post('user/add_user_to_group/', data);
    return response;
};

const removeUserGP = async (payload) => {
  try {
    // Gọi API bằng phương thức DELETE mà không cần thêm `method: 'DELETE'`
    const response = await api.delete('user/remove_user_to_group/', { data: payload });

    if (!response.status === 200) {
      throw new Error("Failed to remove user from group");
    }

    return response.data;  // Trả về dữ liệu từ API nếu thành công
  } catch (error) {
    console.error("Error: ", error);
    throw error;  // Đẩy lỗi ra ngoài để xử lý ở nơi gọi hàm
  }
};


const fetchUserCount = (user_id, group_id) => {
    return api.get("user/user_get_count_api/")
  };

// const postUserGP = () => {
//     return api.post('user/add_user_to_group/')
// }

export { fetchAllUser, fetchUserCount, postUserGP, fetchAllListUsers, fetchAllListGroup, removeUserGP}