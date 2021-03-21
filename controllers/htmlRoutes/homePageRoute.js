const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

// GET then render homepage
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'blog_text',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'), 'like_count'],
      [sequelize.literal('(SELECT COUNT(*) FROM flag WHERE post.id = flag.post_id)'), 'flag_count']
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
        model: User,
        attributes: ['username']
      }      
    ],
    order: [['id', 'DESC']]
  })
    .then(postData => {
      const posts = postData.map(post => post.get({ plain: true }));
      console.log({posts, ...req.session})
      res.render('homepage', { 
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