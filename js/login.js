document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the form from submitting the default way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create an object containing the form data
    const loginData = {
        UserName: email,
        password: password
    };

    // Send the login data using fetch
    await fetch('http://www.jordanshouse.site/ContactManager/LAMPAPI/Login.php', {
        method: 'POST',
        /*headers: {
            'Content-Type': 'application/json'
        },*/
        body: new formdata().append(email, password)  // Convert the login data to JSON format
    })
        .then(response => {
            console.log(response)
            console.log(response.text())
            response.json()
            })  // Parse the JSON response from the server
        .then(data => {
            console.log(data);
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

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}
