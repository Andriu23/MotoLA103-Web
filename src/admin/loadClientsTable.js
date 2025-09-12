import { getDataClients } from "../componentes/cliente.js";

/*const URL_API = 'https://moto-la-103-server.vercel.app';*/

window.addEventListener('load', async () => {
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken !== undefined && sessionToken !== null && sessionToken !== 'null') {
        await crearTablaClientes();
        document.querySelectorAll(".button-Editar").forEach(button => {
            button.addEventListener('click', (event) => {
                const clientId = event.target.id;
                location.href = `/pages/admin/editClient.html?clientId=${clientId}`;
            });
        });

        document.querySelectorAll(".button-Eliminar").forEach(button => {
            button.addEventListener('click', async (event) => {
                const clientId = event.target.id;
                const userResponse = confirm('Esta seguro en eliminar el Cliente');
                if (userResponse) {
                    await deleteClient(clientId);
                    alert('El cliente ha sido eliminado correctamente.');
                    location.href = '/pages/admin/clientsAdmin.html';
                }
            });
        });
    } else {
        alert('Por favor Iniciar Sesión');
        location.href = '../login.html';
    }
});

const crearTablaClientes = async () => {
    const data = await getDataClients();
    const container = document.getElementById('client_container');
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
    const tableHeadId = document.createElement('th');
    const tableHeadUser = document.createElement('th');
    const tableHeadEmail = document.createElement('th');
    const tableHeadPassword = document.createElement('th');
    const tableHeadFullName = document.createElement('th');
    const tableHeadContact = document.createElement('th');
    const tableHeadEdit = document.createElement('th');
    const tableHeadDelete = document.createElement('th');
    tableHeadId.appendChild(document.createTextNode('Id'));
    tableHeadUser.appendChild(document.createTextNode('Usuario'));
    tableHeadEmail.appendChild(document.createTextNode('Email'));
    tableHeadPassword.appendChild(document.createTextNode('Password'));
    tableHeadFullName.appendChild(document.createTextNode('Nombre Completo'));
    tableHeadContact.appendChild(document.createTextNode('Teléfono'));
    tableHeadEdit.appendChild(document.createTextNode('Editar'));
    tableHeadDelete.appendChild(document.createTextNode('Eliminar'));
    tableHeadRow.appendChild(tableHeadId);
    tableHeadRow.appendChild(tableHeadUser);
    tableHeadRow.appendChild(tableHeadEmail);
    tableHeadRow.appendChild(tableHeadPassword);
    tableHeadRow.appendChild(tableHeadFullName);
    tableHeadRow.appendChild(tableHeadContact);
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
        const tableHeadUser = document.createElement("td");
        const tableHeadEmail = document.createElement("td");
        const tableHeadPassword = document.createElement("td");
        const tableHeadFullName = document.createElement('td');
        const tableHeadContact = document.createElement('td');
        const tableDataEdit = document.createElement("td");
        const tableDataDelete = document.createElement("td");
        const ocultarPassword = "*".repeat(element.password.length);
        tableDataId.appendChild(document.createTextNode(element._id));
        tableHeadUser.appendChild(document.createTextNode(element.usuario));
        tableHeadEmail.appendChild(document.createTextNode(element.email));
        tableHeadPassword.appendChild(document.createTextNode(ocultarPassword));
        tableHeadFullName.appendChild(document.createTextNode(element.nombreCompleto));
        tableHeadContact.appendChild(document.createTextNode(element.contacto));

        tableHeadPassword.setAttribute("data-password", element.password);
        tableHeadPassword.setAttribute("data-visible", "false");

        // Evento para alternar entre mostrar/ocultar
        tableHeadPassword.addEventListener("click", () => {
            const visible = tableHeadPassword.getAttribute("data-visible") === "true";
            if (visible) {
                // Vuelve a mostrar los asteriscos
                tableHeadPassword.textContent = "*".repeat(element.password.length);
                tableHeadPassword.setAttribute("data-visible", "false");
            } else {
                // Muestra la contraseña real
                tableHeadPassword.textContent = element.password;
                tableHeadPassword.setAttribute("data-visible", "true");
            }
        });

        tableDataEdit.appendChild(buttonComponent('Editar', element._id));
        tableDataDelete.appendChild(buttonComponent('Eliminar', element._id));
        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableHeadUser);
        tableRow.appendChild(tableHeadEmail);
        tableRow.appendChild(tableHeadPassword);
        tableRow.appendChild(tableHeadFullName);
        tableRow.appendChild(tableHeadContact);
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

const deleteClient = async (id) => {
    try {
        const sessionToken = sessionStorage.getItem('accessToken');
        let response = await fetch(`http://localhost:3000/api/clients/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                },
            });
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
};