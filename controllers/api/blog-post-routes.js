const { BlogPostComment, BlogPost } = require('../../models');

const router = require('express').Router();

/* Post new comment route */
router.post('/:id/comments', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPostComment.create({
            content: req.body.content,
            user_id: req.session.userID,
            blog_post_id: req.params.id
        })
            .then((blogPostComment) => {
                res.status(200).json(blogPostComment);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    }
});

/* Update a blog post */
router.put('/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPost.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            })
        .then(([rows, fields]) => {
            if (!rows) {
                res.status(400).json({ message: "Nothing updated!" });
            } else {
                res.status(200).json(rows);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    }
});

module.exports = router;