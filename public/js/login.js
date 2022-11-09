const usernameInputElement = document.getElementById('username-input');
const passwordInputElement = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const usernameInputForm = document.getElementById('username-input-form');
const passwordInputForm = document.getElementById('password-input-form');
const signupButton = document.getElementById('signup-button');

/* Logic for the signup button on click. Just redirects to the signup page. */
function redirectToSignupPage(event) {
    event.preventDefault();

    document.location.replace('/signup');
}

/* Logic to submit the username and password on password input form and username input form submit and login button on click. */
function submitForm(event) {
    event.preventDefault();

    const username = usernameInputElement.value.trim();
    const password = passwordInputElement.value.trim();

    /* If neither the username nor password is null. */
    if (username && password) {
        /* Reset the forms. */
        usernameInputForm.reset();
        passwordInputForm.reset();

        /* Make a request to the server to login. */
        fetch(`/api/users/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                /* If the response is okay, redirect to the main page. */
                if (response.ok) {
                    document.location.replace('/');
                } else {
                    /* 
                     *  If not, alert the user. 
                     *  NOTE: I would have liked to use a modal here instead of an alert, but I just didn't have enough time,
                     *  as I had to spend a good chunk of time today working on the upcoming project. 
                     */
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