const { BlogPostComment } = require('../../models');

const router = require('express').Router();

/* Post new comment route */
router.post('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPostComment.create({
            content: req.body.content,
            user_id: req.session.userID,
            blog_post_id: req.body.blogPostID
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

/* Edit a comment route. */
router.put('/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPostComment.update({ content: req.body.content }, {
            where: {
                id: req.params.id
            }
        })
        .then(([rowsAffected, poop]) => {
            if (!rowsAffected) {
                res.status(400).json({ message: "No comment updated!" });
            } else {
                res.status(200).json(rowsAffected);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    }
});

/* Delete a comment. */
router.delete('/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPostComment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((numDestroyedRows) => {
            // If no rows were destroyed, there's a problem with the request.
            if (!numDestroyedRows) {
                res.status(400).json({ message: "No comment deleted!" });
            } else {
                res.status(200).json(numDestroyedRows);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    }
});

module.exports = router;