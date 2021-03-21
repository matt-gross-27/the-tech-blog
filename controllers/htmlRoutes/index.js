const router = require('express').Router();

const homePageRoute = require('./homePageRoute');
const loginRoute = require('./loginRoute');
const userPageRoute = require('./userPageRoute');
const editRoute = require('./editRoute');

router.use('/', homePageRoute);
router.use('/login', loginRoute);
router.use('/mypage', userPageRoute);
router.use('/posts/edit', editRoute);

module.exports = router;