import api from './api'

const fetchAllUser = () =>{
    return api.get('user/list/')
}

export { fetchAllUser }