import axios from "axios";

// const access_token = sessionStorage.getItem('access_token');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // headers: {
    //     'authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
    // }   
    
    // withCredentials: true,
});

export default instance;