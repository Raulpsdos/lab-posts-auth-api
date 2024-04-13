const Post = require('../models/post.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    Post.create(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json(error.errors);
            } else {
                next(error);
            }
        });
}

module.exports.list = (req, res, next) => {
    Post.find()
        .then((posts) => {
            res.json(posts)
        })
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    Post.findById(req.params.id)
    .then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    })
    .catch(next);
}

module.exports.update = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true})
        .then((post) =>{
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json(error.errors)
            } else {
                next(error);
            }
        })
}

// module.exports.delete = (req, res, next) => {

// }c
    // .catch((error) => {
    //     if (post) {
    //         res.status(204).send()
    //     } else {
    //         res.status(404).json({ message: 'Post not found' })
    //     }
    // })