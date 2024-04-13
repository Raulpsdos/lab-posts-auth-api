const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.controllers');
const users = require('../controllers/users.controller');

// POSTS
router.post('/posts', posts.create);
router.get('/posts', posts.list);
router.get('/posts/:id', posts.detail);
router.patch('/posts/:id', posts.update);

// USERS
router.post('/users', users.create);
router.post('/login', users.login);

module.exports = router;