document.addEventListener('DOMContentLoaded', function() {
    // Din kod här kommer att köra efter att DOM har laddats
    //console.log('DOM fully loaded and parsed');
    
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    const p = document.createElement('p');
    p.textContent = 'Hello from client js';
    app.appendChild(p);

    const nav = document.createElement('nav');
    nav.classList.add('navbar');
    nav.classList.add('navbar-expand-lg');
    nav.classList.add('bg-body-tertiery')
    const navDiv = document.createElement('div');
    navDiv.classList.add('container-fluid');
    const navUl = document.createElement('ul');
    navUl.classList.add('navbar-nav');
    navUl.classList.add('me-auto');
    navUl.classList.add('mb-2');
    navUl.classList.add('mb-lg-0');

    const btn = document.createElement('button');
    btn.textContent = 'Load data';
    btn.addEventListener('click', loadData);
    addNavBtn(btn, navUl);

    const btnAddContact = document.createElement('button');
    btnAddContact.textContent = 'Add Contact';
    btnAddContact.addEventListener('click', addContact);
    addNavBtn(btnAddContact, navUl);

    const btnDeleteContact = document.createElement('button');
    btnDeleteContact.textContent = 'Delete Contact';
    btnDeleteContact.addEventListener('click', deleteContact);
    addNavBtn(btnDeleteContact, navUl);

    const btnChangeContact = document.createElement('button');
    btnChangeContact.textContent = 'Change Contact';
    btnChangeContact.addEventListener('click', changeContact);
    addNavBtn(btnChangeContact, navUl);

    navDiv.appendChild(navUl);
    nav.appendChild(navDiv);
    app.appendChild(nav);

    const datalist = document.createElement('div');
    datalist.id = 'datalist';
    app.appendChild(datalist);
});

const loadData = () => {
    fetch('/contacts') 
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
        li.innerText = contact.name.concat(" - ", contact.email);
        ul.appendChild(li);
    })
    datalist.appendChild(ul);
};

const addContact = () => {
    let name = prompt('Ange namn');
    let email = prompt('Ange email');
    if (name != '' && email != '') {
        let newContact = {
            name: name,
            email: email
        };
        let contacts = JSON.parse(localStorage.getItem('contacts'));
        contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        saveContacts(newContact);
        populateData(contacts);
    };
};

const deleteContact = () => {
    let name = prompt('Ange namn att ta bort');
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let remove = contacts.find((contact) => contact.name == name);
    let index = contacts.indexOf(remove);
    if (index != -1) {
        contacts.splice(index, 1);
    };
    localStorage.setItem('contacts', JSON.stringify(contacts));
    delContact(remove);
    populateData(contacts);
};

const changeContact = () => {
    let oldName = prompt('Ange namn att ändra');
    let newName = prompt('Ange nytt namn');
    contacts = JSON.parse(localStorage.getItem('contacts'));
    let index = contacts.indexOf(contacts.find((contact) => contact.name == oldName));
    if (index != -1) {
        contacts[index].name = newName;
    };
    localStorage.setItem('contacts', JSON.stringify(contacts));
    saveContacts();
    populateData(contacts);
};

const addNavBtn = (btn, navUl) => {
    let li = document.createElement('li');
    li.classList.add('nav-item');
    li.appendChild(btn);
    navUl.appendChild(li);
};

const saveContacts = (contact) => {
    fetch('/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
};

const delContact = (contact) => {
    fetch('/contacts', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
};