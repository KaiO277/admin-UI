import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.1.11:8000/api/'
});

instance.interceptors.response.use(function(response){
    return response.data;
}, function(error){
    return Promise.reject(error);
});


export default instance;