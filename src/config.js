import axios from 'axios';
export const apiUrl = 'http://localhost/';
//export const apiUrl = '/api/';
let instance = axios.create({
  baseURL: apiUrl,
});
export default instance;