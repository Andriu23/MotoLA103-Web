window.addEventListener('load', () => {
    const formLogin = document.getElementById('loginForm');

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userName = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;
        const response = await getDataUser(userName, password);
        const userData = await response.json();
        if (userData.length > 0 ){
            location.href ='./admin/indexAdmin.html';
        } else {
            alert('Usuario y/o Contraseña Incorrectos');
            location.href ='login.html';
        }
    });
});

export const getDataUser = async (userName, password) => {
    try {
        let response = await fetch('http://localhost:3000/api/getUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userName,
                password: password
            }),
        });
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
}