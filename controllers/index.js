const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

/* Use the root as the home routes. */
router.use('/', homeRoutes);

/* Use the /api prefix for all of the routes to modify users, posts, and comments. */
router.use('/api', apiRoutes);

module.exports = router;