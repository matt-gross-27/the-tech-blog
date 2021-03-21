const router = require('express').Router();
const { Comment } = require('../../models');

// POST /api/comments -> (create a comment)
router.post('/', (req, res) => {
  if (req.session) {
    // expects req.body { "comment_text":"STR", "post_id":INT } if logged in req.session.user_id = INT
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// GET /api/comments -> (get all comment)
router.get('/', (req, res) => {
  Comment.findAll({
    order: [['id', 'desc']]
  })
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/comments/id -> (get one comment by id)
router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(commentData => !commentData ? res.status(404).json({ message: `No comment with id: ${req.params.id}` }) : res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/comments/id -> (delete one comment by id)
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(commentData => !commentData ? res.status(404).json({ message: `No comment with id: ${req.params.id}` }) : res.json(commentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;