const logoutLinkElement = document.getElementById('logout-link');

/* One minute. */
const MAX_IDLE_TIME = 60000;

function logout() {
    fetch(`api/users/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            if (response.ok) {
                document.location.replace('/');
                alert("Logout successful");
            } else {
                alert("Failed to log out.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function logoutAfterIdle() {
    fetch(`api/users/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            if (response.ok) {
                document.location.replace('/');
                alert("Logged out due to a period of inactivity.");
            } else {
                alert("Failed to log out.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

if (logoutLinkElement) {
    logoutLinkElement.addEventListener('click', logout)
    setTimeout(logoutAfterIdle, MAX_IDLE_TIME);
}