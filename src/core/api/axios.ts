import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {handleApiError} from '../utils/apiErrorHandler';
import {store} from '../redux/store';

// Base API configuration
const BASE_URL = ''; // Your machine's IP address

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get the auth token from redux store if available
    const state = store.getState();
    const token = state.auth?.currentUser?.token;

    // If token exists, add it to the headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<any> => {
    // Handle different error types
    if (error.response) {
      // The request was made and the server responded with an error status code
      const {status} = error.response;

      // Handle authentication errors (401)
      if (status === 401) {
        // You can dispatch logout action here if needed
        // store.dispatch(logout());
      }

      // Handle server errors (500)
      if (status >= 500) {
        handleApiError({
          response: {
            data: {
              message: 'Server error. Please try again later.',
            },
          },
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      handleApiError({
        request: error.request,
      });
    } else {
      // Something happened in setting up the request
      handleApiError(error);
    }

    return Promise.reject(error);
  },
);

export default api;
