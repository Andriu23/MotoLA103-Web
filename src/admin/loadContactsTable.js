import { getDataContacts } from "../componentes/contacto.js";

window.addEventListener('load', async () => {
    await crearTablaContacts();
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken !== undefined && sessionToken !== null && sessionToken !== 'null') {
        document.querySelectorAll(".button-Editar").forEach(button => {
            button.addEventListener('click', (event) => {
                const contactId = event.target.id;
                location.href = `/pages/admin/editContact.html?contactId=${contactId}`;
            });
        });

        document.querySelectorAll(".button-Eliminar").forEach(button => {
            button.addEventListener('click', async (event) => {
                const contactId = event.target.id;
                const userResponse = confirm('Esta seguro en eliminar el Contacto');
                if (userResponse) {
                    await deleteContact(contactId);
                    alert('El contacto ha sido eliminado correctamente.');
                    location.href = '/pages/admin/contactsAdmin.html';
                }
            });
        });
    } else {
        alert('Por favor Iniciar Sesión');
        location.href = '../login.html';
    }
});

const URL_API = 'https://moto-la-103-server.vercel.app';

const crearTablaContacts = async () => {
    const data = await getDataContacts();
    const container = document.getElementById('contact_container');
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
    const tableHeadId = document.createElement('th');
    const tableHeadName = document.createElement('th');
    const tableHeadEmail = document.createElement('th');
    const tableHeadContact = document.createElement('th');
    const tableHeadCategory = document.createElement('th');
    const tableHeadHalf = document.createElement('th');
    const tableHeadMessage = document.createElement('th');
    const tableHeadEdit = document.createElement('th');
    const tableHeadDelete = document.createElement('th');
    tableHeadId.appendChild(document.createTextNode('Id'));
    tableHeadName.appendChild(document.createTextNode('Nombre'));
    tableHeadEmail.appendChild(document.createTextNode('Email'));
    tableHeadContact.appendChild(document.createTextNode('Teléfono'));
    tableHeadCategory.appendChild(document.createTextNode('Interés'));
    tableHeadHalf.appendChild(document.createTextNode('Contacto'));
    tableHeadMessage.appendChild(document.createTextNode('Mensaje'));
    tableHeadEdit.appendChild(document.createTextNode('Editar'));
    tableHeadDelete.appendChild(document.createTextNode('Eliminar'));
    tableHeadRow.appendChild(tableHeadId);
    tableHeadRow.appendChild(tableHeadName);
    tableHeadRow.appendChild(tableHeadEmail);
    tableHeadRow.appendChild(tableHeadContact);
    tableHeadRow.appendChild(tableHeadCategory);
    tableHeadRow.appendChild(tableHeadHalf);
    tableHeadRow.appendChild(tableHeadMessage);
    tableHeadRow.appendChild(tableHeadEdit);
    tableHeadRow.appendChild(tableHeadDelete);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
    table.appendChild(createRows(data));
    table.setAttribute('class', 'table');
    container.appendChild(table);
};

/**
 * 
 * @param {*} data Data About plants Info
 * @returns 
 */
const createRows = (data) => {
    const tableBody = document.createElement("tbody");
    data.forEach(element => {
        const tableRow = document.createElement("tr");
        const tableDataId = document.createElement("td");
        const tableHeadName = document.createElement("td");
        const tableHeadEmail = document.createElement("td");
        const tableHeadContact = document.createElement("td");
        const tableHeadCategory = document.createElement('td');
        const tableHeadHalf = document.createElement('td');
        const tableHeadMessage = document.createElement('td');
        const tableDataEdit = document.createElement("td");
        const tableDataDelete = document.createElement("td");
        tableDataId.appendChild(document.createTextNode(element._id));
        tableHeadName.appendChild(document.createTextNode(element.name));
        tableHeadEmail.appendChild(document.createTextNode(element.email));
        tableHeadContact.appendChild(document.createTextNode(element.telefono));
        tableHeadCategory.appendChild(document.createTextNode(element.categoria));
        tableHeadHalf.appendChild(document.createTextNode(element.medio));
        tableHeadMessage.appendChild(document.createTextNode(element.texto));

        tableDataEdit.appendChild(buttonComponent('Editar', element._id));
        tableDataDelete.appendChild(buttonComponent('Eliminar', element._id));
        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableHeadName);
        tableRow.appendChild(tableHeadEmail);
        tableRow.appendChild(tableHeadContact);
        tableRow.appendChild(tableHeadCategory);
        tableRow.appendChild(tableHeadHalf);
        tableRow.appendChild(tableHeadMessage);
        tableRow.appendChild(tableDataEdit);
        tableRow.appendChild(tableDataDelete);
        tableBody.appendChild(tableRow);
    });

    return tableBody;
};

/**
 * 
 * @param {*} buttonLabel 
 * @returns 
 */
const buttonComponent = (buttonLabel, id) => {
    const button = document.createElement('button');
    button.setAttribute('class', `button button-${buttonLabel}`);
    button.setAttribute('id', id);
    button.style.padding = "10px";
    button.style.cursor = "pointer";
    button.appendChild(document.createTextNode(buttonLabel));
    return button;
};

const deleteContact = async (id) => {
    try {
        let response = await fetch(`${URL_API}/api/contacts/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
};