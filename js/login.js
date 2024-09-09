document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the form from submitting the default way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create an object containing the form data
    const loginData = {
        email: email,
        password: password
    };

    // Send the login data using fetch
    await fetch('https://jordanshouse.site/ContactManager/LAMPAPI/Login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)  // Convert the login data to JSON format
    })
        .then(response => response.json())  // Parse the JSON response from the server
        .then(data => {
            if (data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'home.html';  // Redirect to your home page
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while trying to log in.');
        });
});
  