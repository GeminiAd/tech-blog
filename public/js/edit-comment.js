const editCommentInputTextarea = document.getElementById('commentTextarea');
const editCommentButton = document.getElementById('edit-comment-button');
const deleteCommentButton = document.getElementById('delete-comment-button');

/* Logic to delete a blog post comment when the delete blog post comment button is clicked. */
function deleteBlogPostComment(event) {
    event.preventDefault();
    
    /* I need to get the blog post comment ID, which is the last integer in the URL. */
    const pathArray = window.location.pathname.split('/');
    let blogPostID = parseInt(pathArray.pop());
    /* Normally, the site redirects the user to /comments/id. However, the user can physically enter the URL as /comments/id/. */
    /* In that case, the blog post comment ID is the second to last element of the pathArray, not the last one. */
    if (!blogPostID) {
        blogPostID = parseInt(pathArray.pop());
    }

    /* Sene the delete request to the server comment API. */
    fetch(`/api/comments/${blogPostID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        /* If the response is okay, redirect to the homepage. */
        if (response.ok) {
            document.location.replace('/');
        } else {
            /* Otherwise, alert the user that there was a problem. This is mainly for testing purposes, as the above fetch request should work. */
            alert("Failed to delete comment");
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

/* Logic for editing a blog post comment on a form submit event or the edit post button click. */
function submitEditComment(event) {
    event.preventDefault();

    const comments = editCommentInputTextarea.value.trim();

    /* If the comments input text area has content. */
    if (comments) {
        /* We need to get the blog post comment ID from the URL as it is the last integer in the URL */
        const pathArray = window.location.pathname.split('/');
        /* Normally the blog post comment ID is the last element in the array unless the URL is /comments/:id/ */
        let blogPostID = parseInt(pathArray.pop());
        if (!blogPostID) {
            /* If the URL is /comments/:id/, the ID of the comment is actually the second-to-last element of the array. */
            blogPostID = parseInt(pathArray.pop());
        }
        
        /* Send a request to the server comments API to update the blog post comment. */
        fetch(`/api/comments/${blogPostID}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                content: comments
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            /* If the response is okay, redirect the user to the homepage. */
            if (response.ok) {
                document.location.replace('/');
            } else {
                /* Otherwise, display an alert. This is mainly for testing purposes as any edit comment request will be formatted accordingly within this script. */
                alert("Failed to update comment!");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

editCommentButton.addEventListener('click', submitEditComment);
deleteCommentButton.addEventListener('click', deleteBlogPostComment);