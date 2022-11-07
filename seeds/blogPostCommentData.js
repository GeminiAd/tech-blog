const { BlogPostComment } = require('../models');

const blogPostCommentData = [
    {
        content: "I just learned about this in my class!",
        user_id: 2,
        blog_post_id: 1
    },
    {
        content: "This is a test comment.",
        user_id: 1,
        blog_post_id: 1
    },
    {
        content: "This is another test comment.",
        user_id: 2,
        blog_post_id: 2
    }
];

const seedBlogPostComments = () => BlogPostComment.bulkCreate(blogPostCommentData);

module.exports = seedBlogPostComments;