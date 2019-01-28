import { restURL } from '../baseURL'
import axios from 'axios'
const getHeaderAuth = () => {
  return { headers: {"Authorization": `Bearer ${ localStorage.getItem('accessToken') } `} };
};

export const getPhotoById = (id) => axios.get(restURL + '/photo/' + id, getHeaderAuth());
export const uploadPhotos = (uid, details) => axios.post(restURL + '/photos/' + uid + '/upload', details, getHeaderAuth());
export const getPhotosByUserId = (uid) => axios.get(restURL + '/photos/' + uid, getHeaderAuth());
export const updatePhoto = (pid, details) => axios.put(restURL + '/photo/' + pid, details, getHeaderAuth());
export const deletePhoto = (pid) => axios.delete(restURL + '/photo/' + pid, getHeaderAuth());
