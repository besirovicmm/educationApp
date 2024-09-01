
export default function setupInterceptors(axiosInstance) {
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');  // Or however you're storing the token
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle token expiration
          localStorage.removeItem('token');  // Or however you're clearing the token
          window.location.href = '/login';  // Redirect to login page
        }
        return Promise.reject(error);
      }
    );
  }
  