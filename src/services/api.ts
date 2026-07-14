import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('tms_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getHomeData = async (): Promise<any> => {
  try {
    const eventsResponse = await api.get('events');
    return {
      events: eventsResponse.data,
    };
  } catch (error) {
    console.error("Failed to fetch home data", error);
    return {};
  }
};

export default api;
