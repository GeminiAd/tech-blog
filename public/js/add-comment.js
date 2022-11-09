const submitCommentsButtonElement = document.getElementById('post-comments-button');
const commentTextareaElement = document.getElementById('commentTextarea');

/* Submits the new comment to the /api/comments POST create comment route. */
function submitComments(event) {
    const comments = commentTextareaElement.value.trim();

    if (comments) {
        commentTextareaElement.value = '';

        /* I need to get the last integer in the URL as that is the blog post ID. */
        const pathArray = window.location.pathname.split('/');
        let postID = parseInt(pathArray.pop());
        if (!postID) {
            /* The URL can be of the form /:blogPostID or /:blogPostID/. In the latter case, the integer is the second to last element. */
            postID = parseInt(pathArray.pop());
        }

        /* Send the post request to create a new comment. */
        fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ content: comments, blogPostID: postID }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            /* If the comment was created with no problems, redirect to the homepage. */
            if (response.ok) {
                document.location.replace('/');
            } else {
                /* Otherwise, alert the user (this is here mostly for testing purposes, the response should always be okay) */
                alert("Failed to post comment");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

submitCommentsButtonElement.addEventListener('click', submitComments);