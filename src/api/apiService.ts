import * as axios from 'axios';
import { AxiosInstance } from 'axios';

const apiService: AxiosInstance = axios.default.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        Accept: 'application/json',
        Origin: 'http://localhost:5173/',
    },
});

apiService.defaults.withCredentials = true;
apiService.defaults.withXSRFToken = true;

apiService.interceptors.response.use(
    function (response) {
        return response;
    },
    function async(error) {
        if (error.response.data.status === 401) {
        }
    }
);

export default apiService;
