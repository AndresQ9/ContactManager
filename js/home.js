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
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    
    // Get userId from the cookie
    const userId = document.cookie.split('; ').find(row => row.startsWith('userId=')).split('=')[1];

    if (firstName && lastName && phone && email && userId) {
        const contactData = {
            userId: userId,  // Attach userId from cookie
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email
        };

        fetch('http://dylanswebsite.xyz/LAMPAPI/createContact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                document.getElementById('serverError').textContent = data.error; // Display the error on the page
            } else {
                console.log('Contact created successfully');
                // Optionally reload the contacts or update the UI as needed
                loadContacts();  // Assuming this function reloads the contacts
                closeModal();    // Close the modal if the contact was successfully created
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Please fill out all fields.');
    }
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
