import { getDataProducts } from "../componentes/productos.js";

window.addEventListener('load', async () => {
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken !== undefined && sessionToken !== null && sessionToken !== 'null') {
        await crearTablaProductos();
        document.querySelectorAll(".button-Editar").forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.id;
                location.href = `/pages/admin/editProduct.html?productId=${productId}`;
            });
        });

        document.querySelectorAll(".button-Eliminar").forEach(button => {
            button.addEventListener('click', async (event) => {
                const productId = event.target.id;
                const userResponse = confirm('Esta seguro en eliminar el Producto');
                if (userResponse) {
                    await deleteProduct(productId);
                    alert('El producto ha sido eliminado correctamente.');
                    location.href = '/pages/admin/indexAdmin.html';
                }
            });
        });
    } else {
        alert('Por favor Iniciar Sesión');
        location.href = '../login.html';
    }
});

const URL_API = 'https://moto-la-103-server.vercel.app';

/**
 * Creación de la tabla dinamica de Productos
 */
const crearTablaProductos = async () => {
    const data = await getDataProducts();
    const container = document.getElementById('product_container');
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
    const tableHeadId = document.createElement('th');
    const tableHeadImg = document.createElement('th');
    const tableHeadName = document.createElement('th');
    const tableHeadPrice = document.createElement('th');
    const tableHeadCategory = document.createElement('th');
    const tableHeadEdit = document.createElement('th');
    const tableHeadDelete = document.createElement('th');
    tableHeadId.appendChild(document.createTextNode('Id'));
    tableHeadImg.appendChild(document.createTextNode('Imagen'));
    tableHeadName.appendChild(document.createTextNode('Nombre Producto'));
    tableHeadPrice.appendChild(document.createTextNode('Precio'));
    tableHeadCategory.appendChild(document.createTextNode('Categoria'));
    tableHeadEdit.appendChild(document.createTextNode('Editar'));
    tableHeadDelete.appendChild(document.createTextNode('Eliminar'));
    tableHeadRow.appendChild(tableHeadId);
    tableHeadRow.appendChild(tableHeadImg);
    tableHeadRow.appendChild(tableHeadName);
    tableHeadRow.appendChild(tableHeadPrice);
    tableHeadRow.appendChild(tableHeadCategory);
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
        const tableDataImg = document.createElement("td");
        const tableDataName = document.createElement("td");
        const tableDataPrice = document.createElement("td");
        const tableDataCategory = document.createElement('td');
        const tableDataEdit = document.createElement("td");
        const tableDataDelete = document.createElement("td");
        tableDataId.appendChild(document.createTextNode(element._id));
        tableDataName.appendChild(document.createTextNode(element.nombre));
        tableDataPrice.appendChild(document.createTextNode(`$${element.precio}`));
        tableDataCategory.appendChild(document.createTextNode(element.categoria));

        const img = document.createElement("img");
        img.src = element.imagen;
        img.alt = "Product Image";
        img.style.width = "150px";
        img.style.height = "80px";
        img.style.borderRadius = "20px";
        img.style.objectFit = 'contain';
        img.style.overflow = 'hidden';
        tableDataImg.appendChild(img);

        tableDataEdit.appendChild(buttonComponent('Editar', element._id));
        tableDataDelete.appendChild(buttonComponent('Eliminar', element._id));
        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableDataImg);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(tableDataPrice);
        tableRow.appendChild(tableDataCategory);
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

const deleteProduct = async (id) => {
    try {
        const sessionToken = sessionStorage.getItem('accessToken');
        let response = await fetch(`${URL_API}/api/products/${id}`,
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