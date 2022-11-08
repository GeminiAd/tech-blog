const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const usernameInputForm = document.getElementById('username-input-form');
const usernameInput = document.getElementById('username-input');
const passwordInputForm = document.getElementById('password-input-form');
const passwordInput = document.getElementById('password-input');

function redirectToLoginPage(event) {
    event.preventDefault();
    document.location.replace('/login');
}

function submitNewUserForm(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        usernameInputForm.reset();
        passwordInputForm.reset();

        fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.ok) {
                    document.location.replace('/');
                } else {
                    alert('Failed to sign up.');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

loginButton.addEventListener('click', redirectToLoginPage);

signupButton.addEventListener('click', submitNewUserForm);
usernameInputForm.addEventListener('submit', submitNewUserForm);
passwordInputForm.addEventListener('submit', submitNewUserForm);