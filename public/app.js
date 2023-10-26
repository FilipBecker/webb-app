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
    btn.classList.add('btn', 'btn-info');
    addNavBtn(btn);

    const btnAddContact = document.createElement('button');
    btnAddContact.textContent = 'Add Contact';
    btnAddContact.addEventListener('click', showAdd);
    btnAddContact.classList.add('btn', 'btn-primary');
    addNavBtn(btnAddContact);
});

const loadData = async () => {
    fetch('/contacts') 
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('contacts', JSON.stringify(data));
            populateData(data);
        })
};

const populateData = (data) => {
    const infoTable = document.getElementById('infoTable');
    infoTable.innerHTML = '';
    data.forEach(contact => {
        const tr = document.createElement('tr');
        const tdNamn = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdButtons = document.createElement('td');
        tdNamn.innerText = contact.name;
        tdEmail.innerText = contact.email;
        tdButtons.innerHTML = `
            <button class="btn btn-primary btn-sm" onclick="changeContact(${contact.name})">Redigera</button>
            <button class="btn btn-danger btn-sm" onclick="deleteContact('${contact.id}')">Radera</button>`;
        tdEmail.classList.add('bg-info', 'rounded-pill');
        tr.appendChild(tdNamn);
        tr.appendChild(tdEmail);
        tr.appendChild(tdButtons);
        infoTable.appendChild(tr);
    });
};

const showAdd = () => {
    let form = document.getElementById('form');
    form.style.display = "block";
}

const addContact = () => {
    let name = document.forms["addCon"]["Name"].value;
    let email = document.forms["addCon"]["Email"].value;
    if (name != '' && email != '') {
        let newContact = {
            name: name,
            email: email
        };
        saveContacts(newContact);
        document.forms["addCon"]["Name"].value = '';
        document.forms["addCon"]["Email"].value = '';
        let form = document.getElementById('form');
        form.style.display = "none";
    };
    loadData();
};

const deleteContact = (id) => {
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let remove = contacts.find((contact) => contact.id == id);
    let index = contacts.indexOf(remove);
    if (index != -1) {
        contacts.splice(index, 1);
    };
    localStorage.setItem('contacts', JSON.stringify(contacts));
    delContact(id);
    populateData(contacts);
};

const changeContact = (oldName) => {
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

const addNavBtn = (btn) => {
    const navDiv = document.getElementById('navDiv');
    navDiv.appendChild(btn);
};

const saveContacts = async (contact) => {
    fetch('/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
};

const delContact = (id) => {
    fetch(`/contacts/${id}`, {
        method: 'DELETE',
        });
};