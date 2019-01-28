import {ADD_COMMENT, COMMENTS, COMMENTS_ADD, COMMENTS_UPDATE, ERROR, REQUEST, RESPONSE} from "../constants";
import {addComment, getCommentsByPhotoId} from "../api/rest/commentsService";
import store from './index';

const comment = {
  state: {
    photoId: null,
    comments: []
  },
  mutations: {
    [COMMENTS_UPDATE] (state, comments) {
      state.comments = comments;
    },
    [COMMENTS_ADD] (state, comments) {
      state.comments.push(comments);
    }
  },
  actions: {
    async [COMMENTS] ({ commit }, photoId) {
      commit(REQUEST, null, { root: true });
      try {
        const comments = await getCommentsByPhotoId(photoId);
        console.log(comments);
        commit(RESPONSE, null, { root: true });
        commit(COMMENTS_UPDATE, comments.data);
      }
      catch (err) {
        commit(ERROR, err, { root: true });
      }
    },
    async [ADD_COMMENT] ({commit}, comment) {
      commit(REQUEST, null, { root: true });
      try {
        const result = await addComment(comment);
        commit(RESPONSE, null, { root: true });
        const newComment = result.data;
        newComment.User = store.state.auth.user;
        console.log(newComment);
        commit(COMMENTS_ADD, newComment);
      }
      catch (err) {
        commit(ERROR, err, { root: true });
      }
    }
  }
};

export default comment;
