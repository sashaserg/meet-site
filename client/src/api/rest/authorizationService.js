import { restURL } from '../baseURL'
import axios from 'axios'
const getHeaderAuth = () => {
  return { headers: {"Authorization": `Bearer ${ localStorage.getItem('accessToken') } `} };
};


export const login = (details) => axios.post(restURL + '/login', details);
export const logout = (refreshToken) => axios.post(restURL + '/logout', refreshToken);
export const refreshTokens = (refreshToken) => axios.post(restURL + '/refreshTokens', refreshToken);
export const getCurrentUser = () => axios.get(restURL + '/user/current', getHeaderAuth());
