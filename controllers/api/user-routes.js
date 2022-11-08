const { User } = require('../../models');

const router = require('express').Router();

/* Create new user */
router.post('/', (req, res) => {
    User.create({
        user_name: req.body.username,
        password: req.body.password
    })
    .then((user) => {
        console.log(user.user_name);
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userName = user.user_name;
            req.session.userID = user.id;

            res.status(200).json({ user: user, message: 'You are now signed up and logged in!' });
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

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
                        req.session.userName = user.user_name;
                        req.session.userID = user.id;

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

/* Logout route. */
router.post('/logout', (req, res) => {
    console.log(req.session.loggedIn);
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;