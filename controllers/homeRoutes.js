const router = require('express').Router();
// const sequelize = require('../config');
// const { Model1, Model2, Model3 } = require('../models');

// GET '/'
router.get('/', (req, res) => {
  console.log(req.session);
  res.render('homepage', {
    hello: "Hello World"
  });
});

module.exports = router;

