import express from 'express'
import "babel-polyfill"
import userValidator from '../validators/userValidator'
import userController from './userController'
import photoController from './photoController'
import commentController from './commentController'
import filterMiddleware from '../utils/filterMiddleware'
import authentication from '../utils/authentication'

const router = express.Router();

router.post('/api/testPhotos/:id', photoController.test);
router.get('/api/user/current', authentication.checkAccess, userController.getUserByToken);
router.post('/api/user', userValidator.createUser, userController.createUser);
router.get("/api/user", /*authentication.checkAccess,*/ filterMiddleware, userController.getAllUsers);
router.get('/api/user/:id', /*authentication.checkAccess,*/ userController.getUserById);
router.put('/api/user/:id', authentication.checkAccess, userValidator.updateUser, userController.updateUser);
router.delete('/api/user/:id', authentication.checkAccess, userController.deleteUser);
router.post('/api/user/:id/profile', authentication.checkAccess, userController.setProfilePicture);

router.get('/api/photo/:id', authentication.checkAccess, photoController.getPhotoById);
router.put('/api/photo/:id', authentication.checkAccess, photoController.updatePhoto);
router.delete('/api/photo/:id', authentication.checkAccess, photoController.deletePhoto);
router.get('/api/photos/:userId', authentication.checkAccess, photoController.getPhotosByUserId);
router.post('/api/photos/:userId/upload', authentication.checkAccess, photoController.uploadPhotos);

router.get('/api/photos/:photoId/comments', authentication.checkAccess, commentController.getCommentsByPhotoId);
//router.post('/api/photos/:photoId/comments', authentication.checkAccess, commentController.addComment);
router.post('/api/comments', authentication.checkAccess, commentController.addComment);
router.put('/api/comments/:id', authentication.checkAccess, commentController.updateComment);

router.get('/api/check', authentication.checkAccess);
router.post('/api/login', authentication.login);
router.post('/api/logout', authentication.logout);
router.post('/api/refreshTokens', authentication.refreshTokens);


module.exports = router;
