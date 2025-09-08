/*const URL_API = 'https://astro-tech-server.vercel.app'*/

window.addEventListener('load', async () => {
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken !== undefined && sessionToken !== null && sessionToken !== 'null') {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const contactId = urlParams.get('contactId');
        const data = await getDataContactById(contactId);
        const id_input = document.getElementById('id_contact');
        const name_input = document.getElementById('nombre_contact');
        const email_input = document.getElementById('email');
        const telefono_input = document.getElementById('telefono');
        const category_input = document.getElementById('category');
        const half_input = document.getElementById('medio');
        const message_input = document.getElementById('mensaje');


        id_input.value = data._id;
        name_input.value = data.name;
        email_input.value = data.email;
        telefono_input.value = Number(data.telefono);
        category_input.value = data.categoria;
        half_input.value = data.medio;
        message_input.value = data.texto;

        const formUpdateContact = document.getElementById('formEditContact');

        formUpdateContact.addEventListener("submit", async (event) => {
            event.preventDefault();
            await updateContactData(name_input.value, telefono_input.value, half_input.value);
            alert('Los datos del contacto han sido actualizados correctamente');
            location.href = '/pages/admin/contactsAdmin.html';
        });
    } else {
        alert('Por favor Iniciar Sesión');
        location.href = '../login.html';
    }
});

const getDataContactById = async (id) => {
    try {
        let response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Hubo un error');
    }
}

const updateContactData = async (name, telefono, medio) => {
    try {
        let response = await fetch(`http://localhost:3000/api/contacts?name=${name}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    telefono: Number(telefono),
                    medio: medio,
                }),
            });
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
};