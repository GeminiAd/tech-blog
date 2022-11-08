const { User } = require('../models');

const userData = [
    {
        user_name: "Xandromus",
        password: "password"
    },
    {
        user_name: "GeminiAd",
        password: "password"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;