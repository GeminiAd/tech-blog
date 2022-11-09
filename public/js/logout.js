const logoutLinkElement = document.getElementById('logout-link');

/* One minute. */
const MAX_IDLE_TIME = 60000;

/* Logic for the logout nav link at the top of the page. */
function logout() {
    /* Send a logout request to the api/users route. */
    fetch(`/api/users/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            /* If the response is okay, go back to the home page and tell the user they are logged out. */
            if (response.ok) {
                document.location.replace('/');
                /*
                 *  NOTE: I would have liked to use a modal here instead of an alert, but I just didn't have enough time,
                 *  as I had to spend a good chunk of time today working on the upcoming project. 
                 */
                alert("Logout successful");
            } else {
                alert("Failed to log out.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

/* Logic for logging out after idle. */
function logoutAfterIdle() {
    /* Send a request to the server to logout. */
    fetch(`/api/users/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            /* If the response is okay, redirect to the main page and alert the user. */
            if (response.ok) {
                document.location.replace('/');

                /*
                 *  NOTE: I would have liked to use a modal here instead of an alert, but I just didn't have enough time,
                 *  as I had to spend a good chunk of time today working on the upcoming project. 
                 */
                alert("Logged out due to a period of inactivity.");
            } else {
                /* Otherwise, alert the user. Mainly for testing purposes as it should never reach this stage. */
                alert("Failed to log out.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

/* If we're logged in. */
if (logoutLinkElement) {
    /* Add logic to the logout link on click. */
    logoutLinkElement.addEventListener('click', logout)

    /* Set the timeout. */
    setTimeout(logoutAfterIdle, MAX_IDLE_TIME);
}