const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Like } = require('../../models');

// GET /mypage then render html
router.get('/', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
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
    ],
    order: [['id', 'DESC']]
  })
    .then(postData => {
      const posts = postData.map(post => post.get({ plain: true }));
      
      posts.forEach(post => {
        post.i_like = post.likes.filter(like => like.user_id === req.session.user_id).length
      });

      res.render('mypage', { 
        posts,
        ...req.session
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;