import * as axios from 'axios';
import { AxiosInstance } from 'axios';

export interface IApiOkResponse {
    message: string;
    status: number;
    data: [];
}

export interface IApiErrorResponse {
    status: number;
    errors: [generic: string];
    message: string;
}

export interface ValidationErrorApiResponse {
    errors: {
        [key: string]: string[];
    };
    message: string;
}

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
