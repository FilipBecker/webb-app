document.addEventListener('DOMContentLoaded', function() {
    // Din kod här kommer att köra efter att DOM har laddats
    //console.log('DOM fully loaded and parsed');
    
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const p = document.createElement('p');
    p.textContent = 'Hello from client js';
    app.appendChild(p);

    const btn = document.createElement('button');
    btn.textContent = 'Load data';
    btn.addEventListener('click', loadData);
    app.appendChild(btn);

    const btnAddContact = document.createElement('button');
    btnAddContact.textContent = 'Add Contact';
    btnAddContact.addEventListener('click', addContact);
    app.appendChild(btnAddContact);

    const btnDeleteContact = document.createElement('button');
    btnDeleteContact.textContent = 'Delete Contact';
    btnDeleteContact.addEventListener('clock', deleteContact);
    app.appendChild(btnDeleteContact);

    const btnSaveContacts = document.createElement('button');
    btnSaveContacts.textContent = 'Save Contacts';
    btnSaveContacts.addEventListener('click', saveContacts);
    app.appendChild(btnSaveContacts);

    const datalist = document.createElement('div');
    datalist.id = 'datalist';
    app.appendChild(datalist);
});

const loadData = () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('contacts', JSON.stringify(data));
            populateData(data);
        })
};

const populateData = (data) => {
    const datalist = document.getElementById('datalist');
    datalist.innerHTML = '';
    const ul = document.createElement('ul');
    data.forEach(contact => {
        const li = document.createElement('li');
        li.innerText = contact.name;
        ul.appendChild(li);
    })
    datalist.appendChild(ul);
};

const addContact = () => {
    let name = prompt('Ange namn');
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.push({name});
    localStorage.setItem('contacts', JSON.stringify(contacts));
    populateData(contacts);
};

const deleteContact = () => {
    let name = prompt('Ange namn att ta bort');
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    
}

const saveContacts = () => {
    fetch('/newData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: localStorage.getItem('contacts'),
    });
};