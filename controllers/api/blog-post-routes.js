const { BlogPostComment } = require('../../models');

const router = require('express').Router();

/* Post new comment route */
router.post('/:id/comments', (req, res) => {
    BlogPostComment.create({
        content: req.body.content,
        user_id: req.body.user_id,
        blog_post_id: req.params.id
    })
        .then((blogPostComment) => {
            res.status(200).json(blogPostComment);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});

module.exports = router;