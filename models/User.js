const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

/* Each user has a unique ID, a username, and a password. The password is hashed before saving to the database. */
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            beforeBulkCreate: async (users, options) => {
                for (const user of users) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
            beforeCreate: async (user, options) => {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;