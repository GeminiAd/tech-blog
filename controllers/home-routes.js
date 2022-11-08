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

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;