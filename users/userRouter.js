const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const myServer = require('../server')
// const logger = myServer.logger
const router = express.Router();


router.post('/', validateUser, (req, res) => {
  // do your magic!
  const name = req.body.name
  Users
    .insert({ name })
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((err) => {
      res.status(500).json({ message: err })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id
  const text = req.body.text
  Posts
    .insert({ user_id: id, text: text })
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Users.getById(id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Posts
    .getById(id)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((err) => {
      // console.log(err)
      res.status(500).json({ error: err })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  Users.getById(id)
    .then(user => {
      if (user) {
        Users.remove(id)
          .then((u) => {
            res.status(200).json({ recordesDeleted: u })
          })
          .catch((err) => {
            res.status(500).json({ error: err })
          })
      } else {
        res.status(404).json({ error: `User id is not found` })
      }
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  const name = req.body.name
  Users
    .update(id, { name })
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id
  if (!id) {
    res.status(417).json({ message: "invalid user id" })
  } else {
    next()
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name) {
    res.status(417).json({ message: "missing required name field" })
  } else {
    Users.get()
      .then(users => {
        const user = users.find(user => user.name === req.body.name)
        if (user) {
          res.status(400).json({ message: ` ${user.name} is already taken.` })
        } else {
          next()
        }
      })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
}

module.exports = router;
