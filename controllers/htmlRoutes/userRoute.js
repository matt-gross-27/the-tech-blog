const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Like } = require('../../models');

// GET /user/id then render html
router.get('/:username', (req, res) => {
  const userData = User.findOne({
    where: {
      username: req.params.username
    },
    attributes: [
      'id',
      'username'
    ],
    include: {
      model: Post,
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
    }
  })
    .then(userData => {
      const user = userData.get({ plain: true });
      
      user.posts.forEach(post => {
        post.i_like = post.likes.filter(like => like.user_id === req.session.user_id).length
      });

      res.render('blog-feed', {
        ...user,
        ...req.session
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;