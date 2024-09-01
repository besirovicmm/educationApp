// src/utils/userUtils.js
export const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  };
  
  export const isTeacher = () => {
    const user = getUserFromLocalStorage();
    return user && user.role === 'teacher';
  };