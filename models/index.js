const User = require('./User');
const BlogPost = require('./BlogPost');
const BlogPostComment = require('./BlogPostComment');

User.hasMany(BlogPost, {
    foreignKey: "user_id"
});

User.hasMany(BlogPostComment, {
    foreignKey: "user_id"
});

BlogPost.belongsTo(User, {
    foreignKey: "user_id"
});

BlogPost.hasMany(BlogPostComment, {
    foreignKey: "blog_post_id"
});

BlogPostComment.belongsTo(User, {
    foreignKey: "user_id"
});

BlogPostComment.belongsTo(BlogPost, {
    foreignKey: "blog_post_id"
});

module.exports = { User, BlogPost, BlogPostComment };