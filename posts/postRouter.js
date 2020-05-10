const express = require('express');
const Posts = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts
    .get()
    .then(posts => {
      if (posts) {
        res.status(200).json(posts)
      } else {
        res.status(500).json({ error: 'No posts found' })
      }
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Posts
    .getById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(500).json({ error: 'No post found ' })
      }
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Posts
    .remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(500).json({ error: 'No post found ' })
      }
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  const text = req.body.text
  Posts
    .update(id, { text })
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(500).json({ error: 'No post found ' })
      }
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id
  Posts
    .getById(id)
    .then(id => {
      if (id) {
        next()
      } else {
        res.status(404).json({ error: 'No id found for this post' })
      }
    })
}

module.exports = router;
