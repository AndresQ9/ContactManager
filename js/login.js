document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the form from submitting the default way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let userId = 0;

    console.log(username, password);
    // Create an object containing the form data
    const loginData = {
        userName: username,
        password: password
    };

    // Send the login data using fetch
    fetch('http://www.jordanshouse.site/ContactManager/LAMPAPI/Login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)  // Convert the login data to JSON format
    })
        .then(response => {
            return response.json()
            })// Parse the JSON response from the server
        .then(json => {
            console.log(json.id);
            console.log(json.id);
            if (json.error === "") {
                userId = json.id;
                saveCookie();
                //window.location.href = 'home.html';  // Redirect to your home page
            } else {
                document.getElementById('loginError').textContent = "Incorrect Username or Password";
            }
        })// Parse the JSON response from the server
        /*.then(data => {
            console.log(data);
            if (data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'home.html';  // Redirect to your home page
            } else {
                alert('Login failed: ' + data.message);
            }
        })*/
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('serverError').textContent = 'An error occurred while trying to log in.';
        });
});

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}
