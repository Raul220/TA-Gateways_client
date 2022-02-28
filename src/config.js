import axios from 'axios';
export const apiUrl = 'http://localhost/';
export const rootURL = 'http://localhost:3000';
//export const apiUrl = '/api/';
let instance = axios.create({
  baseURL: apiUrl,
});
export default instance;