let editingContactId = null;
let contacts = [];
let userId = document.cookie.split("; ").find((row) => row.startsWith("userId="))?.split("=")[1];
let page = 1;
let loadData = {
    userId: userId,
    search: "",
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

window.onload = function() {loadContacts()};


// Function to render contact cards
function renderContacts(filteredContacts) {
    const contactGrid = document.getElementById('contactGrid');
    contactGrid.innerHTML = '';

    if (filteredContacts.length > 0) {
        filteredContacts.forEach(contact => {
            const contactCard = document.createElement('div');
            contactCard.classList.add('contact-card');

            contactCard.onclick = function () {
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
            deleteButton.onclick = function (event) {
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
function submitContact() {

    const name = document.getElementById('name').value;
    const nickname = document.getElementById('nickname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && nickname && phone && email) {
        if (editingContactId) {
            // Edit the existing contact
            const contactIndex = contacts.findIndex(contact => contact.id === editingContactId);
            if (contactIndex !== -1) {
                contacts[contactIndex].name = name;
                contacts[contactIndex].nickname = nickname;
                contacts[contactIndex].phone = phone;
                contacts[contactIndex].email = email;
            }
        } else {
            // Create a new contact
            const newContact = {
                id: contacts.length + 1, // Generate a new unique id
                name,
                nickname,
                phone,
                email
            };
            contacts.push(newContact); // Add new contact to the array
        }

        renderContacts(contacts);
        closeModal();
    } else {
        alert('Please fill out all fields.');
    }
}
// Function to filter contacts based on search query
function filterContacts() {
    loadData.search = document.getElementById('searchBar').value.toLowerCase();
    console.log(loadData);
    loadContacts();
    //renderContacts(filteredContacts);
}

function loadContacts() {
    fetch('http://www.jordanshouse.site/ContactManager/LAMPAPI/loadContacts.php', {
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
            document.getElementById('serverError').textContent = json.errorr
            renderContacts(contacts);
        })// Parse the JSON response from the server
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('serverError').textContent = json.error;
        });

}
