const express = require('express');
// You will need `users-model.js` and `posts-model.js`
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
// The middleware functions also need to be required
const {validateUser, validatePost, validateUserId} = require('../middleware/middleware')
const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert({name: req.name})
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, {name: req.name})
    .then(()=> {
      return Users.getById(req.params.id)
    })
    .then(user => {
      res.json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res) => {
  
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
});

router.use((err, req, res, next)=> {
  res.status(err.status || 500).json({
    customMessage: 'oooooooof',
    message: err.message
  })
})

// do not forget to export the router
module.exports = router;