const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedBlogPosts = require('./blogPostData');
const seedBlogPostComments = require('./blogPostCommentData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedBlogPosts();

    await seedBlogPostComments();

    process.exit(0);
};

seedAll();