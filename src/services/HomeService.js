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


const fetchUserCount = (user_id, group_id) => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('group_id', group_id);
  
    return api.post('/podcast/podcast_author_add_api/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

// const postUserGP = () => {
//     return api.post('user/add_user_to_group/')
// }

export { fetchAllUser, fetchUserCount, postUserGP, fetchAllListUsers, fetchAllListGroup}