const URL_API = 'https://moto-la-103-server.vercel.app';

window.addEventListener('load', async () => {
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken !== undefined && sessionToken !== null && sessionToken !== 'null') {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const clientId = urlParams.get('clientId');
        console.log(clientId)
        const data = await getDataClientById(clientId);
        console.log(data);
        const id_input = document.getElementById('id_client');
        const user_input = document.getElementById('user');
        const email_input = document.getElementById('email');
        const password_input = document.getElementById('password');
        const name_input = document.getElementById('name');
        const telefono_input = document.getElementById('contacto');

        id_input.value = data._id;
        user_input.value = data.usuario;
        email_input.value = data.email;
        password_input.value = data.password;
        name_input.value = data.nombreCompleto;
        telefono_input.value = Number(data.contacto);

        const formUpdateClient = document.getElementById('formEditClient');

        formUpdateClient.addEventListener("submit", async (event) => {
            event.preventDefault();
            await updateClientData(name_input.value, user_input.value, telefono_input.value);
            alert('Los datos del cliente han sido actualizados correctamente');
            location.href = '/pages/admin/clientsAdmin.html';
        });
    } else {
        alert('Por favor Iniciar Sesión');
        location.href = '../login.html';
    }
});

const getDataClientById = async (id) => {
    try {
        let response = await fetch(`${URL_API}/api/clients/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Hubo un error');
    }
}

const updateClientData = async (name, user, telefono) => {
    try {
        let response = await fetch(`${URL_API}/api/clients?nombreCompleto=${name}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: user,
                    contacto: Number(telefono),
                }),
            });
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
};