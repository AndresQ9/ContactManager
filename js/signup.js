document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  //const firstName = document.getElementById('firstName').value;
  //const lastName = document.getElementById('lastName').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    document.getElementById("passwordMatchError").textContent = "Passwords do not match";
    return;
  }

  const signupData = {
    userName: username,
    password: password
  };

  // Simulate a successful signup process (this is where you could add actual signup logic)
  // Send the login data using fetch
  fetch('http://www.jordanshouse.site/ContactManager/LAMPAPI/Signup.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signupData)  // Convert the login data to JSON format
  })
      .then(response => {
        return response.json()
      })// Parse the JSON response from the server
      .then(json => {
        console.log(json.text);
        if (json.error === "") {
          userId = json.id;
          saveCookie();
          window.location.href = 'home.html';  // Redirect to your home page
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
