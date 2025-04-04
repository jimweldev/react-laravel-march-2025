import axios from 'axios';
import useAuthUserStore from '@/_stores/auth-user.store';

const mainInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor
mainInstance.interceptors.request.use(
  config => {
    const { token } = useAuthUserStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor to handle 401 errors
mainInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useAuthUserStore.getState().clearAuthUser();
    }

    return Promise.reject(error);
  },
);

export { mainInstance };
