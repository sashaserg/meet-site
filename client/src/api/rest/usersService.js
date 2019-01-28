import { restURL } from '../baseURL'
import axios from 'axios'

const getHeaderAuth = () => {
  return { headers: {"Authorization": `Bearer ${ localStorage.getItem('accessToken') } `} };
};

export const addUser = (details) => axios.post(restURL + '/user', details);
export const getAllUsers = (query) => axios.get(restURL + '/user' + query, getHeaderAuth());
export const getUserById = (uid) => axios.get(restURL + '/user/' + uid, getHeaderAuth());
export const updateUser = (uid, details) => axios.put(restURL + '/user/' + uid, details, getHeaderAuth());
export const deleteUser = (uid) => axios.delete(restURL + '/user/' + uid, getHeaderAuth());

export const setProfilePicture = (uid, details) => axios.post(restURL + '/user/' + uid + '/profile', details, getHeaderAuth());

