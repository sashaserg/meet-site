import {Comment, User} from '../models'

module.exports.getCommentsByPhotoId = (req, res, next) => {
    const photoId = req.params.photoId;
    Comment.findAll({
        include: {
            model: User,
            attributes: {
              exclude: ['updatedAt', 'createdAt', 'password', 'email', 'gender', 'purpose', 'role', 'status']
            }
        },
        where: {
            photoId: photoId
        },
        attributes: {
            exclude: ['updatedAt']
        }
    })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            next(err);
        });
};

module.exports.addComment = (req, res, next) => {

    const comment = new Comment(req.body);
    comment.text.trim();
    comment.save()
        .then(result => {
            if(!result) {
                throw new Error('comment has not added');
            }
            res.send(result);
        })
        .catch(err => next(err));
};

module.exports.updateComment = (req, res, next) => {
    const comment = req.body;
    const id = req.params.id;
    Comment.update(comment, {
        where: {
            id: id
        }
    })
        .then(user => {
            if(!user){
                throw new Error('Comment has not updated');
            }
            res.send(user);
        })
        .catch(err => next(err));
};
