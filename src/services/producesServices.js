import { axiosInstance } from '../helper/axios-config';

const getProducers = () => {
    return axiosInstance.get('producer', {
        header: {
            'Content-type' : 'application/json'
        }
    });
}

const createProducer = (data) => {
    return axiosInstance.post('producer', data, {
        heaser: {
            'Content-type' : 'application/json'
        }
    });
}

const updateProducer = (data, producerId) => {
    return axiosInstance.put(`producer/${producerId}`, data, {
        heaser: {
            'Content-type' : 'application/json'
        }
    });
}

export {
    getProducers, createProducer, updateProducer
}