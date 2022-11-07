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

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;