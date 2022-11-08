/* Handles logic for the + New Post button on the dashboard page. */
const createNewPostButton = document.getElementById('create-post-button');

function redirectToCreatePostPage(event) {
    event.preventDefault();

    document.location.replace('/dashboard/create');
}

createNewPostButton.addEventListener('click', redirectToCreatePostPage);