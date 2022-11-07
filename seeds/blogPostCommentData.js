const { BlogPostComment } = require('../models');

const blogPostCommentData = [
    {
        content: "I just learned about this in my class!",
        user_id: 2,
        blog_post_id: 1
    }
];

const seedBlogPostComments = () => BlogPostComment.bulkCreate(blogPostCommentData);

module.exports = seedBlogPostComments;