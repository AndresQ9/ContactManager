let editingContactId = null;
let contacts = [];
let searchQuery = "";
let userId = document.cookie.split("; ").find((row) => row.startsWith("userId="))?.split("=")[1];
let page = 1;
let loadData = {
    userId: userId,
    search: searchQuery,
    page: 1
}
/*const contacts = [
    { id: 1, name: 'John Doe', nickname: 'Johnny', phone: '123-456-7890', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', nickname: 'Janey', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', nickname: 'Mikey', phone: '555-555-5555', email: 'mike@example.com' },
    { id: 4, name: 'Alice Johnson', nickname: 'Ally', phone: '555-123-4567', email: 'alice@example.com' },
    { id: 5, name: 'Bob Jones', nickname: 'Bobby', phone: '555-987-6543', email: 'bob@example.com' },
    { id: 5, name: 'Bob Jones', nickname: 'Bobby', phone: '555-987-6543', email: 'bob@example.com' },
    { id: 5, name: 'Bob Jones', nickname: 'Bobby', phone: '555-987-6543', email: 'bob@example.com' },
    { id: 5, name: 'Bob Jones', nickname: 'Bobby', phone: '555-987-6543', email: 'bob@example.com' },
    { id: 5, name: 'Bob Jones', nickname: 'Bobby', phone: '555-987-6543', email: 'bob@example.com' },
];*/

window.onload = function() {
    loadContacts();
    document.getElementById('searchBar').addEventListener('input', filterContacts);
};


// Function to render contact cards
function renderContacts(filteredContacts) {
    const contactGrid = document.getElementById('contactGrid');
    contactGrid.innerHTML = ''; 

    // Sort the filtered contacts alphabetically by name
    //filteredContacts.sort((a, b) => a.name.localeCompare(b.name));

    filteredContacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');

        contactCard.onclick = function() {
            openEditModal(contact);
        }

        const contactName = document.createElement('h3');
        contactName.textContent = contact.firstName;

        const contactNickname = document.createElement('p');
        contactNickname.innerHTML = `<strong>Nickname:</strong> ${contact.lastName}`;

        const contactPhone = document.createElement('p');
        contactPhone.innerHTML = `<strong>Phone:</strong> ${contact.phone}`;

        const contactEmail = document.createElement('p');
        contactEmail.innerHTML = `<strong>Email:</strong> ${contact.email}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function(event) {
            event.stopPropagation();
            deleteContact(contact.id); 
        };

        contactCard.appendChild(contactName);
        contactCard.appendChild(contactNickname);
        contactCard.appendChild(contactPhone);
        contactCard.appendChild(contactEmail);
        contactCard.appendChild(deleteButton);

        contactGrid.appendChild(contactCard);
    });
}

// Function to delete a contact by ID
function deleteContact(contactId) {
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);
        renderContacts(contacts); 
    }
}

// Function to open the "Create Contact" modal
function openCreateModal() {
    editingContactId = null;
    document.getElementById('modalTitle').textContent = 'Create a New Contact';
    document.getElementById('contactForm').reset(); // Clear the form
    document.getElementById('contactModal').style.display = 'block'; // Show modal
}

// Function to close the modal
function closeModal() {
    document.getElementById('contactModal').style.display = 'none'; 
}

function openEditModal(contact) {
    editingContactId = contact.id;
    document.getElementById('modalTitle').textContent = 'Edit Contact';
    document.getElementById('contactId').value = contact.id;
    document.getElementById('name').value = contact.name;
    document.getElementById('nickname').value = contact.nickname;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('contactModal').style.display = 'block';
}

// Function to submit the contact from the modal form
// Function to submit the contact from the modal form
function submitContact() {
    // Check if userId is available
    // Retrieve userId from the cookie
let userId = document.cookie.split("; ").find((row) => row.startsWith("userId="))?.split("=")[1];

// Log the userId value if it exists
if (userId) {
    // Display the userId on the screen if an element with the ID 'userIdDisplay' exists
    const userIdDisplayElement = document.getElementById('userIdDisplay');
    // Log the userId to the console
    console.log(`User ID: ${userId}`);
} else {
    console.warn('User ID not found in cookies.');
}

    // Gather contact data from the form
    const contactData = {
        firstName: document.getElementById('name').value,
        lastName: document.getElementById('nickname').value,  // Assuming 'nickname' is actually 'lastName'
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        userId: userId // Ensure this is the correct ID of the logged-in user
    };

    // Send contact data to the server
    fetch('http://dylanswebsite.xyz/LAMPAPI/saveContact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)  // Convert the contact data to JSON format
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(json => {
        if (json.error) {
            throw new Error(json.error);
        }
        console.log('Contact created:', json);
        loadContacts(); // Reload contacts to reflect changes
    })
    .catch(error => {
        console.error('Error:', error);
        const serverErrorElement = document.getElementById('serverError');
        if (serverErrorElement) {
            serverErrorElement.textContent = 'An error occurred: ' + error.message;
        } else {
            alert('An error occurred: ' + error.message); // Fallback if the element doesn't exist
        }
    });
}


// Function to filter contacts based on search query
function filterContacts() {
    var input = document.getElementById('searchBar');
    var filter = input.value.toLowerCase();
    var contactGrid = document.getElementById("contactGrid");
    var contactCards = contactGrid.getElementsByClassName('contact-card');

    // Loop through all contact cards, and hide those who don't match the search query
    for (var i = 0; i < contactCards.length; i++) {
        var contactCard = contactCards[i];
        var contactName = contactCard.getElementsByTagName("h3")[0].textContent.toLowerCase();
        var contactNickname = contactCard.getElementsByTagName("p")[0].textContent.toLowerCase();
        var contactPhone = contactCard.getElementsByTagName("p")[1].textContent.toLowerCase();
        var contactEmail = contactCard.getElementsByTagName("p")[2].textContent.toLowerCase();
        
        // Check if any of the contact details match the search query
        if (contactName.includes(filter) || contactNickname.includes(filter) || contactPhone.includes(filter) || contactEmail.includes(filter)) {
            contactCard.style.display = "";
        } else {
            contactCard.style.display = "none";
        }
    }
}

function loadContacts() {
    fetch('http://dylanswebsite.xyz/LAMPAPI/loadContacts.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loadData)  // Convert the login data to JSON format
    })
        .then(response => {
            //console.log(response.text());
            return response.json()
        })// Parse the JSON response from the server
        .then(json => {
            console.log(json);
            contacts = json.contacts;
            if (json.error !== "") {
                document.getElementById('serverError').textContent = json.error;
            }
            renderContacts(contacts);
        })// Parse the JSON response from the server
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('serverError').textContent = 'An error occurred while trying to register, try again.';
        });

}
