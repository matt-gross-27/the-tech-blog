const router = require('express').Router();

// GET /login
router.get('/', (req, res) => {
  res.render('search', req.session);
});

module.exports = router;