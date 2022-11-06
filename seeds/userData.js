const { User } = require('../models');

const userData = [
    {
        user_name: "Xandromus",
        email: "xandromus@email.com",
        password: "password"
    },
    {
        user_name: "GeminiAd",
        email: "musicismytherapy@gmail.com",
        password: "password"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;