const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blog-post-routes');
const blogPostCommentRoutes = require('./blog-post-comment-routes');

router.use('/users', userRoutes);
router.use('/posts', blogPostRoutes);
router.use('/comments', blogPostCommentRoutes);

module.exports = router;