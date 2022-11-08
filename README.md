<base target="_blank">

# Tech Blog

<a href="#description">Description</a> •
<a href="#key-features">Key Features</a> •
<a href="#usage">Usage</a> •
<a href="#technologies-used">Technologies Used</a> •
<a href="#concepts-demonstrated">Concepts Demonstrated</a> •
<a href="#credits">Credits</a> •
<a href="#author">Author</a>

---

[Deployed application](https://salty-crag-65332.herokuapp.com/)

---

## Description

This site is a tech blog, with users, blog posts, and comments. When you first visit the site, you're taken to the homepage where all blog posts are displayed. If you click on the login nav link at the top, you're taken to a page where you can sign up or log in. When you're logged in on the homepage, you can click on each blog post to go to a page where you can add a comment to that blog post. When logged in on the homepage, you can click on any comment that you posted and you're taken to a page where you can edit or delete the comment. If you're logged in you can click on the dashboard nav link at the top and you're taken to the dashboard, which is a page with all the posts that you authored and an add post button. If you click on a post in the dashboard, you're taken to a page where you can edit or delete that post. If you click on the add post button in the dashboard, you're taken to a page where you can create a post. Oh, and if you idle for too long, you're automatically logged out and taken back to the main page.

## Key Features

- Log in or sign up with a new account by creatig a new user.
- When you navigate away from the page your session information is saved so you don't have to login again.
- When you're idle for a set time period, you are automatically logged out.
- View all blog posts and comments and the date they were created on the home page.
- Create, edit, and delete blog posts.
- Create, edit, and delete comments
- Mobile-responsive design using Bootstrap.

## Usage

When you first visit the home page, all blog posts and their comments are displayed:

![Homepage](./images/homepage.png)

If you click on either the dashboard or login nav link, you're taken to a login page where you can either login:

![Login page](./images/login.png)

## Technologies Used

- [bcrypt npm package](https://www.npmjs.com/package/bcrypt) for password hashing.
- [Sequelize v6](https://sequelize.org/) for the data modelling.
- [handlebars js](https://handlebarsjs.com/) as a templating engine.
- [node.js](https://nodejs.org/en/) as a server-side javascript runtime environment.
- [Bootstrap v5.2.2](https://getbootstrap.com/) for card and form components, shadow effects, and responsiveness.
- [JavaScript](https://www.javascript.com/)

## Concepts Demonstrated

- Setting up a project using the Model-View-Controller model.
- Using handlebars as the View layer.
- Using Sequelize as the Model layer.
- Using Express.js as the controll layer.
- The use of node.js
- Installing and using node.js packages using npm.
- General JavaScript and programming knowledge.
- Understanding and using CSS Frameworks, such as Bootstrap.
- General HTML/CSS knowledge.

## Credits

Manuel Nunes for a mock-up of the site that I borrowed heavily from.

## Author

Adam Ferro

- [Github](https://github.com/GeminiAd)
- [Linked-In](https://www.linkedin.com/in/adam-ferro)
