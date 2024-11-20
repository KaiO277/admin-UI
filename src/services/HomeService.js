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
    return api.get("user/user_get_count_api/")
  };

// const postUserGP = () => {
//     return api.post('user/add_user_to_group/')
// }

export { fetchAllUser, fetchUserCount, postUserGP, fetchAllListUsers, fetchAllListGroup}