import http from './httpService';
const url = 'http://localhost:9005/api/users';

export function register(user) {
  return http.post(url, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
