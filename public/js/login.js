const usernameInputElement = document.getElementById('username-input');
const passwordInputElement = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const usernameInputForm = document.getElementById('username-input-form');
const passwordInputForm = document.getElementById('password-input-form');
const signupButton = document.getElementById('signup-button');

function redirectToSignupPage(event) {
    event.preventDefault();

    document.location.replace('/signup');
}

function submitForm(event) {
    event.preventDefault();

    const username = usernameInputElement.value.trim();
    const password = passwordInputElement.value.trim();

    if (username && password) {
        usernameInputForm.reset();
        passwordInputForm.reset();

        fetch(`/api/users/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.ok) {
                    document.location.replace('/');
                } else {
                    alert('Failed to log in.');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

loginButton.addEventListener('click', submitForm);
usernameInputForm.addEventListener('submit', submitForm);
passwordInputForm.addEventListener('submit', submitForm);

signupButton.addEventListener('click', redirectToSignupPage);