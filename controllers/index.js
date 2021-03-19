const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

// router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// last route
router.use((req, res) => {
  res.status(404).json({ message: "Nothing to see here" }).end();
});

module.exports = router;