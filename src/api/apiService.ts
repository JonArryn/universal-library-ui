import * as axios from 'axios';
import { AxiosInstance } from 'axios';

const apiService: AxiosInstance = axios.default.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    },
});

apiService.defaults.withCredentials = true;
apiService.defaults.withXSRFToken = true;

export default apiService;
