import {ERROR, PHOTO, PHOTO_UPDATE, PHOTOS, PHOTOS_UPDATE, REQUEST, RESPONSE} from "../constants";
import {getPhotoById, getPhotosByUserId} from "../api/rest/photosService";

const photo = {
  state: {
    photos: [],
    currentPhoto: {}
  },
  mutations: {
    [PHOTOS_UPDATE] (state, photos) {
      state.photos = photos;
    },
    [PHOTO_UPDATE] (state, photo) {
      state.currentPhoto = photo;
    }
  },
  actions: {
    async [PHOTOS] ({ commit }, userId) {
      commit(REQUEST, null, { root: true });
      try {
        const photos = await getPhotosByUserId(userId);
        console.log(photos);
        commit(RESPONSE, null, { root: true });
        commit(PHOTOS_UPDATE, photos.data);
      }
      catch (err) {
        commit(ERROR, err, { root: true });
      }
    },
    async [PHOTO] ({ commit }, photoId) {
      commit(REQUEST, null, { root: true });
      try {
        const photo = await getPhotoById(photoId);
        commit(RESPONSE, null, { root: true });
        commit(PHOTO_UPDATE, photo.data);
      }
      catch (err) {
        commit(ERROR, err, { root: true });
      }
    }
  }
};

export default photo;
