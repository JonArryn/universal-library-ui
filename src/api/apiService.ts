import * as axios from 'axios';
import { AxiosInstance } from 'axios';

export interface IApiOkResponse {
    message: string;
    status: number;
    data: { [key: string]: never };
}

export interface IApiErrorResponse {
    status: number;
    errors: { [key: string]: string[] };
    message: string;
}

export interface IApiValidationErrorResponse {
    errors: {
        [key: string]: string[];
    };
    message: string;
}

const apiService: AxiosInstance = axios.default.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
    },
});

apiService.defaults.withCredentials = true;
apiService.defaults.withXSRFToken = true;

export default apiService;
