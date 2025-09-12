const URL_API = 'https://moto-la-103-server.vercel.app';

export const formRegister = async (event) => {
    event.preventDefault();

    try {
        // Obtener valores
        const usuario = document.getElementById('usuario').value.trim();
        const email = document.getElementById('email_registro').value.trim();
        const password = document.getElementById('password').value;
        const confirmarPassword = document.getElementById('password2').value;
        const nombreCompleto = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        const contacto = Number(telefono);

        // Validar campos vacíos
        if (!usuario || !email || !password || !confirmarPassword || !nombreCompleto || !contacto) {
            alert('⚠️ Por favor complete todos los campos.');
            return;
        }

        // Validar coincidencia de contraseñas
        if (password !== confirmarPassword) {
            alert('❌ Las contraseñas no coinciden.');
            return;
        }

        // Validar longitud mínima de contraseña
        if (password.length < 8) {
            alert('🔒 La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        // Crear objeto de registro
        const registroCompleto = {
            usuario,
            email,
            password,
            nombreCompleto,
            contacto,
        };
        await fetch(`${URL_API}/api/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registroCompleto),
        });
        alert('✅ Su registro fue exitoso.');

        // Opcional: limpiar formulario después del registro
        event.target.reset();

    } catch (error) {
        console.error("❌ Error en el registro:", error);
        alert('Ocurrió un error al procesar el registro.');
    }
};

export const getDataClients = async () => {
    try {
        let response = await fetch(`${URL_API}/api/clients`);
        return await response.json();
    } catch (error) {
        console.error('Hubo un error');
    }
}