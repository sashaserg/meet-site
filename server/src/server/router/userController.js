import { User } from '../models/index';
import path from 'path'
import {Photo} from "../models";
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const multer = require('multer');

module.exports.getAllUsers = (req, res, next) => {
    const filter = req.filter;

    User.findAll({
        where: {[Sequelize.Op.and]: filter},
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
        }
    })
        .then(result => {
            res.send(result);
        })
        .catch(err => next(err));

};

module.exports.getUserById = (req, res, next) => {
    const id = req.params.id;
    User.findById(id,
        {
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
        }
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => next(err));
};

module.exports.createUser = (req, res, next) => {
    const user = new User(req.body);
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
    user.save()
        .then(user => {
            if(!user){
                throw new Error('user is not added');
            }
            res.send("User added");
        })
        .catch(err => {
            next(err)
        });
};

module.exports.updateUser = (req, res, next) => {
    const user = req.body;
    const userId = req.params.id;
    if( user.password )
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
    User.update(user, {
        where: {
            id: userId
        }
    })
        .then(user => {
            if(!user){
                throw new Error('user is not updated');
            }
            res.send(user);
        })
        .catch(err => next(err));
};

module.exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    User.destroy({
        where: {
            id: userId
        }
    })
        .then(row => {
            if(row)
                res.send("User has been deleted");
            else
                throw new Error('User is not already exist');
        })
        .catch(err => {
            next(err);
        })
};

module.exports.setProfilePicture = (req, res, next) => {
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
        .single('avatar');

    upload(req, res, function (err) {
        if (err) {
            next(new Error(err.code + ' ' + err.message));
        } else {
            const photoUrl = 'http://localhost:3000/' + req.file.path.replace('src/', '');
            User.update({profilePicture: photoUrl}, {where: {id}});
            res.send('Avatar was updated');
        }
    });
};

module.exports.getUserByToken = async(req, res, next) => {
    console.log('getUserByToken start')
    try {
        console.log('userId: ' + req.userId);
        const userId = req.userId;
        const user = await User.findOne({
            where: {id: userId, status: 'active'},
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
        });
        if (!user)
            throw ({message: 'user is not found'});
        console.log('getUserByToken end')
        res.json(user);
    } catch(err) {
        next(err)
    }
};
