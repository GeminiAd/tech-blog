const submitCommentsButtonElement = document.getElementById('post-comments-button');
const commentTextareaElement = document.getElementById('commentTextarea');

function submitComments(event) {
    const comments = commentTextareaElement.value.trim();

    if (comments) {
        commentTextareaElement.value = '';

        const pathArray = window.location.pathname.split('/');
        let postID = parseInt(pathArray.pop());
        if (!postID) {
            postID = parseInt(pathArray.pop());
        }

        fetch(`/api/posts/${postID}/comments`, {
            method: 'POST',
            body: JSON.stringify({ content: comments }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            if (response.ok) {
                document.location.replace('/');
            } else {
                alert("Failed to post comment");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

submitCommentsButtonElement.addEventListener('click', submitComments);