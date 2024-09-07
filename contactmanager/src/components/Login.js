import React, { useState } from 'react';
import './Login.scss';
import md5 from "../md5";

const urlBase = 'ContactManager/contactmanager/LAMPAPI'; //Add the url we will use later
const extension = 'php';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    let userId = 0;
    let firstName = "";
    let lastName = "";

    e.preventDefault();
    // Add authentication logic here
    console.log('username:', username);
    console.log('Password:', password);

    //Hash the password
    var hash = md5( password );

    //document.getElementById("loginResult").innerHTML = ""; TODO

    var tmp = {username: username, password: hash};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
      xhr.onreadystatechange = function()
      {
        if (this.readyState == 4 && this.status == 200)
        {
          console.log(xhr.responseText);
          let jsonObject = JSON.parse( xhr.responseText );

          userId = jsonObject.id;

          if( userId < 1 ) //No username-password combo found
          {
            //document.getElementById("loginResult").innerHTML = "User/Password combination incorrect"; TODO
            return;
          }

          firstName = jsonObject.firstName;
          lastName = jsonObject.lastName;

          //saveCookie(); TODO

          window.location.href = "contact.html"; //Add the window redirect later something like contact manager
        }
      };
      xhr.send(jsonPayload);
    }
    catch(err)
    {
      //document.getElementById("loginResult").innerHTML = err.message;
    }



  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
