import { axiosInstance } from '../helper/axios-config';

const getDirectors = () => {
    return axiosInstance.get('director', {
        header: {
            'Content-type' : 'application/json'
        }
    });
}

const createDirector = (data) => {
    return axiosInstance.post('director', data, {
        header: {
            'Content-type' : 'application/json'
        }
    });
}

const updateDirector = (data, directorId) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        header: {
            'Content-type' : 'application/json'
        }
    });
}

export {
    getDirectors, createDirector, updateDirector
}