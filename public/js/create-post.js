const createPostButton = document.getElementById('create-post-button');
const titleInputForm = document.getElementById('title-input-form');
const contentInputForm = document.getElementById('content-input-form');
const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('contentTextarea');

/* Submits the information in the create post form to the server api to create a new post. */
function createPost(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    /* If both the title and content input fields have data. */
    if (title && content) {
        /* Make the POST request to the server API route to make a new blog post. */
        fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ 
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            /* If the response is okay, redirect them to the dashboard. */
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                /* If the response is not okay, alert the user. This is mainly for testing purposes, as the fetch call should work perfectly. */
                alert("Failed to create post!");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

createPostButton.addEventListener('click', createPost);
titleInputForm.addEventListener('submit', createPost);
contentInputForm.addEventListener('submit', createPost);