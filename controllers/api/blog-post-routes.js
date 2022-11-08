const { BlogPostComment, BlogPost } = require('../../models');

const router = require('express').Router();

/* Create a blog post */
router.post('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userID
        })
        .then((blogPost) => {
            res.status(200).json(blogPost);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        })
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

/* Delete a blog post */
router.delete('/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        BlogPost.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((numDestroyedRows) => {
            // If no rows were destroyed, there's a problem with the request.
            if (!numDestroyedRows) {
                res.status(400).json({ message: "Error: no blog posts deleted" });
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