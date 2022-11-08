const path = require('path');

/* Import the npm packages that we need to start the server. */
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

/* Import the routes we have set up. */
const routes = require('./controllers');
/* Import the database connection. */
const sequelize = require('./config/connection');
/* Import all handlebars helper functions. */
const helpers = require('./utils/helpers');

/* Create an instance of express.js */
const app = express();
/* Use either Heroku's port or the usual 3001 local port. */
const PORT = process.env.PORT || 3001;

/* Session information. */
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

/* Have express use the session middleware. */
app.use(session(sess));

/* Create an instance of handlebars with the helper functions. */
const hbs = exphbs.create({ helpers });

/* Use handlebars, set it as the view engine. */
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* Enable support for parsing JSON content from the request body. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Serve up all files in the public directory statically. */
app.use(express.static(path.join(__dirname, 'public')));

/* Have express use the routes we set up in the controllers directory. */
app.use(routes);

/* Sync with the Sequelize database, then have express listen for requests. */
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});