import { Photo } from '../models/index';
import path from 'path'
import {User, Comment} from "../models";
const multer = require('multer');

module.exports.getPhotosByUserId = (req, res, next) => {
    const userId = req.params.userId;
    Photo.findAll({
        /*include: {
            model: Comment,
            where: {
                photoId: Photo.id
            },
            attributes: {
                exclude: ['createdAt']
            }
        },*/
        where: {userId: userId},
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(result => {
            res.send(result);
        })
        .catch(err => next(err));
};

module.exports.getPhotoById = (req, res, next) => {
    const photoId = req.params.id;
    Photo.findById(photoId,
        {
            attributes: {
                exclude: ['updatedAt']
            }
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => next(err));
};

module.exports.test = (req, res, next) => {
    const id = req.params.id;
    let filename = "";
    const storage = multer.diskStorage({
        destination: './src/public/img/',
        filename: (req, file, cb) => {
            filename = Date.now() + '-' + file.originalname;
            cb(null, filename);
        }
    });

    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            const filetypes = /jpeg|jpg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            if (mimetype && extname) {
                return cb(null, true);
            }
            return cb(new Error("Error: " +
                "File upload only supports the following file types - " + filetypes));
        }})
        .single('file');

    upload(req, res, function (err) {
        if (err) {
            next(new Error(err.code + ' ' + err.message));
        } else {
            const photoUrl = 'http://localhost:3000/' + req.file.path.replace('src/', '');
            Photo.create(
                {
                    url: photoUrl,
                    userId: id
                });
            res.send('Photo was added');
        }
    });
};

module.exports.uploadPhotos = (req, res, next) => {
    const userId = req.params.userId;
    let filename = "";

    const storage = multer.diskStorage({
        destination: './src/public/img/',
        filename: (req, file, cb) => {
            filename = Date.now() + '-' + file.originalname;
            cb(null, filename);
        }
    });

    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
            const filetypes = /jpeg|jpg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            if (mimetype && extname) {
                return cb(null, true);
            }
            return cb(new Error("Error: " +
                "File upload only supports the following file types - " + filetypes));
        }})
        .array('photos', 10); // 10 is the max count of photos

    upload(req, res, function (err) {
        if (err) {
            next(new Error(err.code + ' ' + err.message));
        } else {
            const photos = [];
            req.files.map((photo) => {
                const photoUrl = 'http://localhost:3000/' + photo.path.replace('src/', '');
                const newPhoto = {url: photoUrl, userId: userId};
                photos.push(newPhoto);
            });
            Photo.bulkCreate(photos, { individualHooks: true })
                .then(()=>{
                    res.send('Photos were uploaded');
                })
                .catch(err => {
                    next(err)});
        }
    });
};

module.exports.deletePhoto = (req, res, next) => {
    const photoId = req.params.id;
    Photo.destroy({
        where: {
            id: photoId
        }
    })
        .then(row => {
            if(row)
                res.send("Photo has been deleted");
            else
                throw new Error('Photo is not already exist');
        })
        .catch(err => {
            next(err);
        })
};

module.exports.updatePhoto = (req, res, next) => {
    const photo = req.body;
    const photoId = req.params.id;

    Photo.update(photo, {
        where: {
            id: photoId
        },
        returning: true
    })
        .then(result => {
            if(!result){
                throw new Error('Photo is not updated');
            }
            res.send(result);
        })
        .catch(err => next(err));

};
