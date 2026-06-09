import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For receiving refresh token in HttpOnly cookies
});

// Interceptor for attaching Access Token
api.interceptors.request.use(
  (config) => {
    // In a real app, you might want to get the token from localStorage or a state manager
    // if you don't store it in an HttpOnly cookie (which is preferred).
    // If it's stored in localStorage:
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling 401 and Token Rotation
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token using the refresh token
        // This assumes the refresh token is sent automatically via HttpOnly cookie
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (data.accessToken && typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.accessToken);
          api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token expired or invalid -> log out
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
