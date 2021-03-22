const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Like } = require('../../models');

// GET /posts/:id then render html
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'blog_text',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: Like,
        attributes: ['user_id']
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(postData => {
      const post = postData.get({ plain: true });
      
      post.i_like = post.likes.filter(like => like.user_id === req.session.user_id).length

      post.comments.reverse();

      console.log(post.comments);

      res.render('single-post', { 
        post,
        ...req.session
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;