const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blog-post-routes');
const blogPostCommentRoutes = require('./blog-post-comment-routes');

/* Link /users to the user routes file. */
router.use('/users', userRoutes);

/* Link /posts to the blog post routes file. */
router.use('/posts', blogPostRoutes);

/* Link /comments to the blog post comments routes file. */
router.use('/comments', blogPostCommentRoutes);

module.exports = router;