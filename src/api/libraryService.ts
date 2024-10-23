import axios, {AxiosInstance} from 'axios';  

const apiURL : string = import.meta.env.VITE_API_URL;

const libraryService: AxiosInstance = axios.create({
    baseURL: apiURL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default libraryService;