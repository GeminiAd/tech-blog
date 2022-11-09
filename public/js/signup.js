const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const usernameInputForm = document.getElementById('username-input-form');
const usernameInput = document.getElementById('username-input');
const passwordInputForm = document.getElementById('password-input-form');
const passwordInput = document.getElementById('password-input');

/* Logic for the login button on click. */
function redirectToLoginPage(event) {
    event.preventDefault();
    document.location.replace('/login');
}

/* Logic for the username and password input forms on submit and signup button on click. */
function submitNewUserForm(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    /* If neither the username nor the password is empty. */
    if (username && password) {
        /* Reset both forms. */
        usernameInputForm.reset();
        passwordInputForm.reset();

        /* Send a create user request with the input values. */
        fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                /* If the response is okay, redirect to the main page. */
                if (response.ok) {
                    document.location.replace('/');
                } else {
                    /* Otherwise, alert the user. Can be caused by submitting a password of length less than 6. */
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