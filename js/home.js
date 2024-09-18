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
    //contactGrid.innerHTML = '';

    if (filteredContacts != null) {
        filteredContacts.forEach(contact => {
            const contactCard = document.createElement('div');
            contactCard.classList.add('contact-card');

            contactCard.onclick = function () {
                openEditModal(contact);
            }

            const contactName = document.createElement('h3');
            contactName.innerHTML = `<input id=${contact.id + 'Name'} class="contact-input-header" placeholder=${contact.lastName}>`;

            const contactNickname = document.createElement('p');
            contactNickname.innerHTML = `<strong>Last Name:</strong> <input id=${contact.id + 'Nickname'} class="contact-input" placeholder=${contact.lastName}>`;

            const contactPhone = document.createElement('p');
            contactPhone.innerHTML = `<strong>Phone:</strong> <input id=${contact.id + 'Phone'} class="contact-input" placeholder=${contact.phone}>`;

            const contactEmail = document.createElement('p');
            contactEmail.innerHTML = `<strong>Email:</strong> <input id=${contact.id + 'Email'} class="contact-input" placeholder=${contact.email}>`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '×';
            deleteButton.classList.add('delete-button');
            deleteButton.title = 'Delete';
            deleteButton.onclick = function (event) {
                event.stopPropagation();
                confirmDelete(contact.id);
            };
            const saveButton = document.createElement('button');
            saveButton.textContent = '✓';
            saveButton.classList.add('save-button');
            saveButton.title = 'Save';
            deleteButton.onclick = function (event) {
                event.stopPropagation();
                submitContact(contact.id);
            };

            contactCard.appendChild(contactName);
            contactCard.appendChild(contactNickname);
            contactCard.appendChild(contactPhone);
            contactCard.appendChild(contactEmail);
            contactCard.appendChild(deleteButton);
            contactCard.appendChild(saveButton);

            contactGrid.appendChild(contactCard);
        });
    }
}

// Function to delete a contact by ID
function deleteContact() {
    document.getElementById('confirmDelModal').style.display = 'none';
    let contactId = document.getElementById('delContactId').value;
    fetch('http://www.jordanshouse.site/ContactManager/LAMPAPI/deleteContact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userId, contactId: contactId})  // Convert the login data to JSON format
    })
        .then(response => {
           console.log(response.text());
            return response.json()
        })// Parse the JSON response from the server
        .then(json => {
            console.log(json);
        })// Parse the JSON response from the server
        .catch(error => {
            console.error('Error:', error);
            //document.getElementById('serverError').textContent = json.error;
        });
    reloadContacts();
}

//Opens modal to confirm deletion of contact
function confirmDelete(contactId) {
    document.getElementById('confirmDelModal').style.display = 'block';
    document.getElementById('delContactId').value = contactId;
}

//Deletes contact if confirmed
function handleClick() {
    document.getElementById('confirmDelModal').style.display = 'none';
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
    console.log("here");
    document.getElementById('feedback').textContent = '';
    document.getElementById('contactModal').style.display = 'none'; 
}

/*function openEditModal(contact) {
    editingContactId = contact.id;
    document.getElementById('modalTitle').textContent = 'Edit Contact';
    document.getElementById('contactId').value = contact.id;
    document.getElementById('name').value = contact.firstName;
    document.getElementById('nickname').value = contact.lastName;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('contactModal').style.display = 'block';
}*/

// Function to submit the contact from the modal form
function submitContact(id) {
    const contactData = {
        contactId: editingContactId,
        firstName: document.getElementById(id+'Name').value,
        lastName: document.getElementById(id+'Nickname').value,  // Assuming 'nickname' is actually 'lastName'
        phone: document.getElementById(id+'Phone').value,
        email: document.getElementById(id+'Email').value,
        userId: userId // Include the userId in the contact data
    };

    if(contactData.firstName === '' ||
        contactData.phone === ''){
        document.getElementById('feedback').textContent = 'Must have at least name and number';
        return
    }
    if(id === 'create') {
        fetch('http://www.jordanshouse.site/ContactManager/LAMPAPI/saveContact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
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
                //document.getElementById('feedback').textContent = 'Contact saved';
                reloadContacts();
            })
            .catch(error => {
                console.log(error);
                //document.getElementById('feedback').textContent = 'An error occurred try again';
            });
    }
    else{
        console.log(contactData);
        fetch('http://www.jordanshouse.site/ContactManager/LAMPAPI/EditContact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        })
            .then(response => {
                //console.log(response.text());
                return response.json();
            })
            .then(json => {
                if (json.error) {
                    throw new Error(json.error);
                }
               // document.getElementById('feedback').textContent = 'Contact saved';
                reloadContacts();
            })
            .catch(error => {
                console.error('Error:', error);
                //document.getElementById('feedback').textContent = 'An error occurred try again';
            });
    }
    document.getElementById('feedback').textContent = '';
}


// Function to filter contacts based on search query
function filterContacts() {
    loadData.search = document.getElementById('searchBar').value.toLowerCase();
    loadData.page = 1;
    console.log(loadData);
    document.getElementById('contactGrid').innerHTML = '';
    loadContacts();
    //renderContacts(filteredContacts);
}

function loadMore(){
    loadData.page += 1;
    if(loadContacts() === "No Records Found"){
        loadData.page -=1;
    }
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
            if(json.error === "") {
                contacts = json.contacts;
                document.getElementById('loadButtonFeedback').textContent = json.error;
                document.getElementById('serverError').textContent = json.error;
                renderContacts(contacts);
            }
            else{
                document.getElementById('loadButtonFeedback').textContent = json.error;
                console.log(loadData.page);
                return json.error
            }
        })// Parse the JSON response from the server
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('serverError').textContent = json.error;
        });

    return "";
}

function reloadContacts(){
    document.getElementById('contactGrid').innerHTML = '';
    const currentPage = loadData.page;
    loadData.page = 0;
    while(loadData.page < currentPage){
        loadData.page++;
        loadContacts();
    }
}