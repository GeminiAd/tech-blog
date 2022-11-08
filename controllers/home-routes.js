const router = require('express').Router();
const { BlogPostComment, BlogPost, User } = require('../models');

router.get(`/`, (req, res) => {
    BlogPost.findAll({
        include: [
            {
                model: User,
                attributes: ["user_name"]
            },
            {
                model: BlogPostComment,
                include: [
                    {
                        model: User,
                        attributes: ["user_name"]
                    }
                ]
            }
        ]
    })
        .then((rawBlogPosts) => {
            const blogPosts = rawBlogPosts.map((rawBlogPost) => {
                return rawBlogPost.get({ plain: true });
            });

            res.render('home', {
                blogPosts,
                loggedIn: req.session.loggedIn,
                userName: req.session.userName
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
});

/* Dashboard page with all of the user's blog posts listed. */
router.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPost.findAll({
            where: {
                user_id: req.session.userID
            }
        })
        .then((rawBlogPosts) => {
            const userBlogPosts = rawBlogPosts.map(rawBlogPost => rawBlogPost.get({ plain: true }));

            res.render('dashboard', {
                userBlogPosts,
                loggedIn: req.session.loggedIn,
                dashboard: true
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    }
});

/* Edit blog post page. */
router.get('/dashboard/posts/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPost.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ["id"]
            }]
        })
        .then((rawBlogPost) => {
            if (!rawBlogPost) {
                res.status(404).json({message: "Cannot find a blog post with that ID!"});
            } else {
                // If the user isn't the one who authored the blog post, redirect to the dashboard
                console.log(rawBlogPost.user.id);
                console.log(req.session.userID);

                if (rawBlogPost.user.id !== req.session.userID) {
                    res.redirect('/dashboard');
                } else {
                    const blogPost = rawBlogPost.get({ plain : true });

                    res.render('edit-blog-post', {
                        blogPost,
                        loggedIn: req.session.loggedIn,
                        dashboard: true
                    });
                }
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    }
});

/* Route to the create blog post page. */
router.get('/dashboard/create', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        res.render('create-blog-post', {
            dashboard: true,
            loggedIn: req.session.loggedIn
        });
    }
});

/* Route to the add comment page. */
router.get('/posts/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["user_name"]
                }
            ]
        })
            .then((rawBlogPost) => {
                if (!rawBlogPost) {
                    res.status(404).json({ message: "No post found with that id!" });
                } else {
                    const blogPost = rawBlogPost.get({ plain: true });
                    res.render('add-comments', { blogPost, loggedIn: req.session.loggedIn, userName: req.session.userName });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    }
});

/* Route to the login page. */
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;