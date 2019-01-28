import { restURL } from '../baseURL'
import axios from 'axios'
const getHeaderAuth = () => {
  return { headers: {"Authorization": `Bearer ${ localStorage.getItem('accessToken') } `} };
};
export const getCommentsByPhotoId = (photoId) => axios.get(restURL + '/photos/'
+ photoId + '/comments', getHeaderAuth());
export const addComment = (comment) => axios.post(restURL + '/comments', comment, getHeaderAuth());
