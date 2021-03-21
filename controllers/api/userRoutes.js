const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Post, Comment, Like, Flag } = require('../../models');

// POST /api/users/id -> (create one user by id)
router.post('/', (req, res) => {
  // expects req.body === {"username": "STR", "email": "STR(isEmail)", "password": "STR(len >= 8)" }
  User.create(req.body)
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users -> (read all users)
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/id -> (read one user by id)
router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Post
      },
      {
        model: Post,
        through: Like,
        as: 'liked_posts'
      },
      {
        model: Post,
        through: Flag,
        as: 'flagged_posts'
      },
      {
        model: Comment,
        include: {
          model: Post
        }
      }
    ]
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: `No user with id: ${req.params.id}` });
        return;
      }
      res.json(userData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/users/id -> (update one user by id)
router.put('/:id', (req, res) => {
  // expects req.body === {"username": "STR", "email": "STR(isEmail)", "password": "STR(len >= 8)" }
  User.update(req.body, {
    individualHooks: true,
    where: { id: req.params.id }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: `No user with id: ${req.params.id}` });
        return;
      }
      res.json(userData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/id -> (delete one user by id)
router.delete('/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: `No user with id: ${req.params.id}` });
        return;
      }
      res.json(userData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST LOGIN /api/users/login (create a session object with { username, user_id, loggedIn: true})
router.post('/login', (req, res) => {
  //expects req.body = { "email": "STR(isEmail)", "password": "STR(len >= 8)" }
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: `No user found with id: ${req.params.id}` });
        return;
      }
      bcrypt.compare(req.body.password, userData.password)
        .then(validPassword => {
          if (!validPassword) {
            res.status(400).json({ message: `Email does not match password` });
            return;
          }
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            // req.session.cookie.maxAge = 3600,
            res.json({ ...req.session, message: `Welcome to The Tech Blog ${userData.username}` });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// POST LOGOUT /api/users/logout (destroy session object)
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: `You need to be logged in to log out` }).end();
  }
});

module.exports = router;