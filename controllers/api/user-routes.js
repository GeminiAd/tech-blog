const { User } = require('../../models');

const router = require('express').Router();

/* Login route. */
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            user_name: req.body.username
        }
    })
        .then((user) => {
            if (!user) {
                reject();
            } else {
                return Promise.all([
                    new Promise((resolve, reject) => resolve(user)),
                    user.checkPassword(req.body.password)
                ]);
            }
        })
        .then(
            ([user, correctPassword]) => {
                if (!correctPassword) {
                    res.status(400).json({ message: 'Incorrect password!' });
                } else {
                    req.session.save(() => {
                        req.session.loggedIn = true;

                        res.status(200).json({ user: user, message: 'You are now logged in!' });
                    });
                }
            },
            () => {
                res.status(400).json({ message: "Incorrect username or password!" });
            }
        )
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
});

module.exports = router;