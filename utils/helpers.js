/* 
 *  Returns whether the author of the blog post is the user viewing the site to chenge the color of the blog title.
 *  I have this defined as a proper function instead of fat arrow syntax as I need to use the 'this' keyword.
 */
function isAuthor(username) {
    return this.user.user_name === username;
}

module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    is_author: isAuthor
}