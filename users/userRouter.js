const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body)
          .then(user => {
            res.status(201).json(user)
          })
          .catch((error) => {
            next(error)
          })
});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.params.id;
  postDb.insert(req.body)
          .then((post) => {
            res.status(201).json(post);
          })
          .catch((error) => {
            next(error)
          })
});

router.get('/', (req, res) => {
  userDb.get(req.query)
          .then((users) => {
            res.status(200).json(users)
          })
          .catch((error) => {
            next(error)
          })
});

router.get('/:id', validateUserId, (req, res) => {
  userDb.getById(req.params.id)
          .then((user) => {
            if(user) {
              res.status(200).json(user)
            }
          })
          .catch((error) => {
            next(error)
          })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.params.id)
          .then((posts) => {
            res.status(200).json(posts)
          })
          .catch((error) => {
            next(error)
          })
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id)
          .then((user) => {
            res.status(200).json(user)
          })
          .catch((error) => {
            next(error)
          })
});

router.put('/:id', validateUserId, (req, res) => {
  userDb.update(req.params.id, req.body)
          .then((user) => {
            res.status(201).json(user)
          })
          .catch((error) => {
            next(error)
          })
});

//custom middleware

function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
          .then((user) => {
            if(user) {
              req.user = user;
              next();
            } else {
              res.status(400).json({ message: "invalid user id"})
            }
          })
}

function validateUser(req, res, next) {
  if(!req.body) {
    return res.status(400).json({ message: "missing user data" })
  } else if(!req.body.name) {
    return res.status(400).json({ message: "missing required name field"})
  }
  next()
}

function validatePost(req, res, next) {
  if(!req.body) {
    return res.status(400).json({ message: "missing post data" })
  } else if(!req.body.text) {
    return res.status(400).json({ missing: "require text field" })
  }
  next()
}

module.exports = router;
