import http from './httpService';
import jwtDecode from 'jwt-decode';
const url = 'http://localhost:9005/api/auth';

const tokenKey = 'token';
let token = GetJWT();
if (token) http.setJwt(token);

export async function login(Username, password) {
  const { data: jwt } = await http.post(url, { email: Username, password });
  console.log(jwt);
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function GetJWT() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJWT,
  GetJWT,
};
