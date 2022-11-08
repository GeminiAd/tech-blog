/* This file holds all logic for connecting to the database. */

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

/* If we're on HEROKU, use the JAWSDB_URL as parameters to connect to the database. */
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  /* Otherwise, use the local environment parameters and port. */
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;