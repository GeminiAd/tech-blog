function isAuthor(username) {
    console.log(this);
    return this.user.user_name === username;
}

module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    is_author: isAuthor
}