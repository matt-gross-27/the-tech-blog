const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

// GET /mypage then render html
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
      [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id)'), 'like_count'],
      // [sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE post.id = `like`.post_id and `like`.user_id = '+ req.session.user_id +')'), 'i_like'],
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
      const post = postData.get({ plain: true });
      console.log({post, ...req.session})
      res.render('edit-post', { 
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