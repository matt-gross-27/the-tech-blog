const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

// catch all route
router.use((req, res) => {
  res.status(404).json({ message: "Nothing to see here" }).end();
});

module.exports = router;