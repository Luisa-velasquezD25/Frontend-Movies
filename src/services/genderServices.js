import { axiosInstance } from '../helper/axios-config';

const getGenders = () => {
    return axiosInstance.get('gender', {
        header: {
            'Content-type' : 'application/json'
        }
    });
}

const createGender = (data) => {
    return axiosInstance.post('gender', data, {
        header: {
            'Content-type' : 'application/json'
        }
    });
}

const updateGender = (data, genderId) => {
    return axiosInstance.put(`gender/${genderId}`, data, {
        header: {
            'Content-type' : 'application/json'
        }
    });
}

export {
    getGenders, createGender, updateGender
}