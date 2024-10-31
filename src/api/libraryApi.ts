import axios, { AxiosInstance } from 'axios';

const libraryApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: { 'Content-Type': 'application/json' },
});

export default libraryApi;
