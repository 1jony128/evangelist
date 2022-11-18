import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
    baseURL: process.env.REACT_APP_API,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = 'Token 02064c1ca019072ad521dd88b722db1019854ac2';
    }
    return config;
});
