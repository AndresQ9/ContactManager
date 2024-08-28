const urlBase = 'http://somethingsomething.xyz/LAMPAPI'; //Add the url we will use later
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function login(){
	userId = 0;
	firstName = "";
	lastName = "";
	
    //Pull the username and password from the HTML
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

    //Hash the password
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

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
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 ) //No username-password combo found
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contact.html"; //Add the window redirect later something like contact manager
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie(){
	let minutes = 30;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie(){
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html"; //Make sure home page is called index
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function logout(){
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact(){
    let newContact = document.getElementById("contactName").value; //Get the new contact name the user wants to add
    document.getElementById("addContactResult").innerHTML = "";

    let tmp = {name: newContact, userId: userId};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/AddContact.' + extension;

    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addContactResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addContactResult").innerHTML = err.message;
	}


}

function searchContact(){
	let srch = document.getElementById("searchContact").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {search: srch, userId: userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contacts have been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
                //Loop through the results
				for( let i=0; i<jsonObject.results.length; i++ )
				{
                    //Concatenate the result to the end of our list
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )//Ensure its a new contact
					{
						contactList += "<br />\r\n"; //Add a break statement and new line in our HTML for formatting
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList; //Update paragraph info with our list
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}
