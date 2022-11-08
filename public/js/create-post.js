const createPostButton = document.getElementById('create-post-button');
const titleInputForm = document.getElementById('title-input-form');
const contentInputForm = document.getElementById('content-input-form');
const titleInput = document.getElementById('title-input');
const contentInput = document.getElementById('contentTextarea');

function createPost(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
        fetch(`/api/posts`, {
            method: 'POST',
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