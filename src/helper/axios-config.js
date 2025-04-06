import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:4000/'
    baseURL: 'https://movies-backend-iud-9u2e.onrender.com'
})


export {
    axiosInstance
}