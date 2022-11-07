const logoutLinkElement = document.getElementById('logout-link');

function logout() {
    return fetch(`api/users/logout`, {
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

console.log(logoutLinkElement);

if (logoutLinkElement) {
    logoutLinkElement.addEventListener('click', logout)
}