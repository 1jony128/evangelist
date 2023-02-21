import axios from 'axios';

// const useHTTPS = process.env.REACT_APP_USE_HTTPS;
//
// let homeUrl = process.env.REACT_APP_HOME_URL as string;
// homeUrl = homeUrl.replace('http://', '');
// homeUrl = homeUrl.replace('https://', '');
// let baseUrl = process.env.REACT_APP_BASE_URL as string;
// baseUrl = baseUrl.replace('http://', '');
// baseUrl = baseUrl.replace('https://', '');
//
// if (useHTTPS === 'true') {
//   baseUrl = 'https://' + baseUrl;
//   homeUrl = 'https://' + homeUrl;
// } else {
//   baseUrl = 'http://' + baseUrl;
//   homeUrl = 'http://' + homeUrl;
// }

// export const HOME_URL = homeUrl;
export const BASE_URL = "http://localhost:5001";

export const $api = axios.create({
  baseURL: BASE_URL + '/api/',
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvbnlAZ21haWwuY29tIiwiaWQiOjEsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTMxVDA0OjA0OjAzLjIyMVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAxLTMxVDA0OjA0OjAzLjIyMVoiLCJVc2VyUm9sZXMiOnsiaWQiOjIsInJvbGVJZCI6MSwidXNlcklkIjoxfX1dLCJpYXQiOjE2NzU5NDE5MjcsImV4cCI6MTY3NjAyODMyN30.8L0etq33hCuqzTTgPHfS1tWObanY4j6vMl8grmn-dog`;

    config.headers[`Accept-Language`] = `${localStorage.getItem('i18nextLng')}`;
  }
  return config;
});
