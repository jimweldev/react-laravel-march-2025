import axios from 'axios';
import useAuthUserStore from '@/_stores/auth-user.store';

const mainInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

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

export { mainInstance };
