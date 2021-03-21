const router = require('express').Router();
const { Post, User, Comment, Like, Flag } = require('../../models');
const sequelize = require('../../config/connection');

// POST /api/posts/ -> (create a post)
router.post('/', (req, res) => {
  Post.create({
    // expects req.body = { "title": "STR", "blog_text": "TXT" } (if loggedIn === true)
    title: req.body.title,
    blog_text: req.body.blog_text,
    user_id: req.session.user_id || req.body.user_id
  })
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/posts/ -> (read all posts)
router.get('/', (req, res) => {
  Post.findAll({
    order: [['created_at', 'desc']],
    attributes: [
      'id',
      'title',
      'blog_text',
      'user_id',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'), 'like_count'],
      [sequelize.literal('(SELECT COUNT(*) FROM flag WHERE post.id = flag.post_id)'), 'flag_count']
    ],
    include: [
      { 
        model: User, 
        attributes: ['username'] 
      },
      { 
        model: Comment,
        order: [['created_at', 'desc']],
        include: {
          model: User, 
          attributes: ['username']
        }
      }
    ]
  })
    .then(postData => res.json(postData))
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET /api/posts/:id -> (read one post by id)
router.get('/:id', (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: [
      'id',
      'title',
      'blog_text',
      'user_id',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'), 'like_count'],
      [sequelize.literal('(SELECT COUNT(*) FROM flag WHERE post.id = flag.post_id)'), 'flag_count']
    ],
    include: [
      { 
        model: User, 
        attributes: ['username'] 
      },
      { 
        model: Comment,
        order: [['created_at', 'desc']],
        include: {
          model: User, 
          attributes: ['username']
        }
      },
    ]
  })
    .then(postData => !postData ? res.status(404).json({ message: `No post with id: ${req.params.id}` }) : res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/like -> (like a post)
router.put('/like', (req, res) => {
  if (req.session) {
    // expects req.body === { "post_id": INT } if logged in req.session.user_id = INT
    Post.like({
      ...req.body,
      user_id: req.session.user_id || req.body.user_id
    },
    { 
      Like,
      User,
    })
      .then(postData => res.json(postData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  } else {
    res.status(400).json({ message: 'you need to be logged in to like a post' });
  }
});

// PUT /api/posts/unlike -> (unLike a post)
router.put('/unlike', (req, res) => {
  if (req.session) {
    // expects req.body === { "post_id": INT } if logged in req.session.user_id = INT
    Post.unlike({
      ...req.body,
      user_id: req.session.user_id || req.body.user_id
    },
    { 
      Like,
      User,
    })
      .then(postData => res.json(postData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  } else {
    res.status(400).json({ message: 'you need to be logged in to like a post' });
  }
});

// WORK IN PROGRESS
// PUT /api/posts/flag -> (flag a post)
router.put('/flag', (req, res) => {
  if (req.session) {
    // expects req.body === { "post_id": INT } if logged in req.session.user_id = INT
    Post.flag({
      ...req.body,
      user_id: req.session.user_id || req.body.user_id
    },
    { 
      Flag,
      User,
    })
      .then(postData => res.json(postData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  } else {
    res.status(400).json({ message: 'you need to be logged in to flag a post' });
  }
});

// PUT /api/posts/unflag -> (unFlag a post)
router.put('/unflag', (req, res) => {
  if (req.session) {
    // expects req.body === { "post_id": INT } if logged in req.session.user_id = INT
    Post.unflag({
      ...req.body,
      user_id: req.session.user_id || req.body.user_id
    },
    { 
      Flag,
      User,
    })
      .then(postData => res.json(postData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  } else {
    res.status(400).json({ message: 'you need to be logged in to flag a post' });
  }
});

// WORK IN PROGRESS END

// PUT api/posts/:id -> (update a post by id)
router.put('/:id', (req, res) => {
  // expects req.body === { "title": "STR", "blog_text": "STR" }
  Post.update(req.body, {
    where: { id: req.params.id }
  })
    .then(postData => !postData ? res.status(404).json({ message: `No post with id: ${req.params.id}` }) : res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE api/posts/:id -> (delete a post by id)
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: { id: req.params.id }
  })
    .then(postData => !postData ? res.status(404).json({ message: `No post with id: ${req.params.id}` }) : res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;