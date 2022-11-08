const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPostComment extends Model { }

/* 
 *  Each blog post comment has a unique ID, some text content, the user_id of the user that posted the comment, and the blog_post_id of 
 *  the blog post associated with this comment.
 */
BlogPostComment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        blog_post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blog_post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog_post_comment',
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

module.exports = BlogPostComment;