import axios from 'axios';

export default async function sendReq(url, method, options) {
  let response = await axios
    .request({
      baseURL: 'http://localhost:9005/api',
      url,
      method,
      data: options,
      timeout: 60000,
    })
    .catch((error) => {
      return error;
    })
    .then((response) => response);
  return response;
}
