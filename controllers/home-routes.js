const router = require('express').Router();
const { BlogPost, User } = require('../models');

router.get(`/`, (req, res) => {
    BlogPost.findAll({
        include: [
            {
                model: User,
                attributes: ["user_name"]
            }
        ]
    })
        .then((rawBlogPosts) => {

            const blogPosts = rawBlogPosts.map((rawBlogPost) => rawBlogPost.get({ plain: true }));

            res.render('home', {
                blogPosts
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
});

module.exports = router;