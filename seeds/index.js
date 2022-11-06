const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedBlogPosts = require('./blogPostData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedBlogPosts();

    process.exit(0);
};

seedAll();