const router = require('express').Router();

const homePageRoute = require('./homePageRoute');
const loginRoute = require('./loginRoute');
const myPage = require('./myPage');
const editRoute = require('./editRoute');
const searchRoute = require('./searchRoute');
const userRoute = require('./userRoute')
const singlePostRoute = require('./singlePostRoute')

router.use('/', homePageRoute);
router.use('/login', loginRoute);
router.use('/mypage', myPage);
router.use('/posts/edit', editRoute);
router.use('/posts', singlePostRoute);
router.use('/search', searchRoute);
router.use('/', userRoute);

module.exports = router;