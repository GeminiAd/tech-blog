const editTitleInputElement = document.getElementById('title-input');
const editContentInputElement = document.getElementById('contentTextarea');
const editTitleInputForm = document.getElementById('title-input-form');
const editContentInputForm = document.getElementById('content-input-form');
const editBlogPostButton = document.getElementById('edit-post-button');
const deleteBlogPostButton = document.getElementById('delete-post-button');

/* Handles the logic for the delete blog post button on click. */
function deleteBlogPost(event) {
    event.preventDefault();
    
    /* We need to get the blog post ID from the last integer in the URL. */
    const pathArray = window.location.pathname.split('/');
    let postID = parseInt(pathArray.pop());
    if (!postID) {
        /* The user can enter the URL as /:id/. In that case, the ID is the second to last element in the path array. */
        postID = parseInt(pathArray.pop());
    }

    /* Make the delete request to the server API post delete route. */
    fetch(`/api/posts/${postID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        /* If the response is okay, redirect to the dashboard. */
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            /* Otherwise, alert the user. This is only done for testing purposes, as this script should always send the correct request to the correct path. */
            alert("Failed to delete post");
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

/* Handles the logic for the title input form and content input form on submit, and edit post button on click. */
function editBlogPost(event) {
    event.preventDefault();
    
    const title = editTitleInputElement.value.trim();
    const content = editContentInputElement.value.trim();

    /* If neither of the title and content input boxes are empty */
    if (title && content) {
        /* Get the blog post ID of the blog post to edit from the path URL */
        const pathArray = window.location.pathname.split('/');
        let postID = parseInt(pathArray.pop());
        if (!postID) {
            /* Normally the blog post ID is the last element in the path array, unless the user typed in /posts/:id/. */
            postID = parseInt(pathArray.pop());
        }

        /* Send the update request  */
        fetch(`/api/posts/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            /* If the response is okay, redirect to the dashboard. */
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                /* Otherwise, alert the user. This is more for testing purposes, as the request should be sent okay. */
                alert("Failed to update post");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

editTitleInputForm.addEventListener('submit', editBlogPost);
editContentInputForm.addEventListener('submit', editBlogPost);
editBlogPostButton.addEventListener('click', editBlogPost);
deleteBlogPostButton.addEventListener('click', deleteBlogPost);