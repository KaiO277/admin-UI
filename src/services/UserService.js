import axios from './customize-axios';

const fetchAllUsers = () => {
    return axios.get("user/user_get_all_api/");
}

const postCreateTry = (name, email, message, image) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('image', image); // Append the file

    // No need to set headers manually; axios will automatically set them
    return axios.post("try/try_add_api/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export { fetchAllUsers, postCreateTry }