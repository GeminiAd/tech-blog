const editCommentInputTextarea = document.getElementById('commentTextarea');
const editCommentButton = document.getElementById('edit-comment-button');
const deleteCommentButton = document.getElementById('delete-comment-button');

function deleteBlogPostComment(event) {
    event.preventDefault();
    
    const pathArray = window.location.pathname.split('/');
    let blogPostID = parseInt(pathArray.pop());
    if (!blogPostID) {
        blogPostID = parseInt(pathArray.pop());
    }

    fetch(`/api/comments/${blogPostID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Failed to delete comment");
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

function submitEditComment(event) {
    event.preventDefault();

    const comments = editCommentInputTextarea.value.trim();

    if (comments) {
        const pathArray = window.location.pathname.split('/');
        let blogPostID = parseInt(pathArray.pop());
        if (!blogPostID) {
            blogPostID = parseInt(pathArray.pop());
        }
        
        fetch(`/api/comments/${blogPostID}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                content: comments
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            if (response.ok) {
                document.location.replace('/');
            } else {
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