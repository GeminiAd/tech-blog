const editTitleInputElement = document.getElementById('title-input');
const editContentInputElement = document.getElementById('contentTextarea');
const editTitleInputForm = document.getElementById('title-input-form');
const editContentInputForm = document.getElementById('content-input-form');
const editBlogPostButton = document.getElementById('edit-post-button');
const deleteBlogPostButton = document.getElementById('delete-post-button');

function deleteBlogPost(event) {
    event.preventDefault();
    
    const pathArray = window.location.pathname.split('/');
    let postID = parseInt(pathArray.pop());
    if (!postID) {
        postID = parseInt(pathArray.pop());
    }

    fetch(`/api/posts/${postID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("Failed to delete post");
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

function editBlogPost(event) {
    event.preventDefault();
    
    const title = editTitleInputElement.value.trim();
    const content = editContentInputElement.value.trim();

    if (title && content) {
        const pathArray = window.location.pathname.split('/');
        let postID = parseInt(pathArray.pop());
        if (!postID) {
            postID = parseInt(pathArray.pop());
        }

        fetch(`/api/posts/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
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