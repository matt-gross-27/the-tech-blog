const router = require('express').Router();

const homePageRoute = require('./homePageRoute');
const loginRoute = require('./loginRoute');

router.get('/', homePageRoute);
router.get('/login', loginRoute);

module.exports = router;