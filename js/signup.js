document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  // Simulate a successful signup process (this is where you could add actual signup logic)
  console.log('Signup successful:', { firstName, lastName, email, password });

  alert("Signup successful!");

  window.location.href = "/login";
});
