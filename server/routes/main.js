const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware')
const authLayout = '../views/layouts/auth';

/**
 * GET /
 * HOME
*/
router.get('/', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Blog",
    }

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])

    return res.status(200).render('index', { 
      locals,
      data,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Post :id
*/
router.get('/post/:id', authMiddleware, async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
    }

    return res.status(200).render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});

router.get('/create-post',async (req, res) => {
  try {
    const locals = {
      title: 'Add Post',
    }

    return res.status(200).render('main/create-post', {
      locals,
      layout: authLayout
    });

  } catch (error) {
    console.log(error);
  }

});

router.post('/create-post', authMiddleware, async (req, res) => {
  try {
    try {
      if (!req.body || !req.body.title || !req.body.body) {
        return res.status(404).json({message: "Недостаточно данных"})
      }

      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        userId: req.user.id,
      });

      await Post.create(newPost);
      // res.redirect('/');
      return res.status(200).json(newPost);
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * POSTS
*/
router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])

    return res.status(200).json(data);

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * POST BY ID
*/
router.get('/one-post/:id', authMiddleware, async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    return res.status(200).json(data);

  } catch (error) {
    console.log(error);
  }

});


module.exports = router;
