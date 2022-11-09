/* Handles logic for the + New Post button on the dashboard page. */
const createNewPostButton = document.getElementById('create-post-button');

/* Logic for the create new post button on the dashboard. */
/* All we need to do is redirect to the create new post page and the server will do the rest. */
function redirectToCreatePostPage(event) {
    event.preventDefault();

    document.location.replace('/dashboard/create');
}

createNewPostButton.addEventListener('click', redirectToCreatePostPage);