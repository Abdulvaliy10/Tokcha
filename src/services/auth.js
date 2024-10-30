import axiosInstance from './base';

import { jwtDecode } from 'jwt-decode';
import http from './http';

const tokenKey = 'token';

http.setJwt(getJwt());

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const login = async (username, password) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', {
      username,
      password
    });
    localStorage.setItem('token', data.token);
    return { error: false };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

const authApi = {
  login,
  getCurrentUser
};

export default authApi;
