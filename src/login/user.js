const URL_API = 'https://moto-la-103-server.vercel.app';

window.addEventListener('load', () => {
    const formLogin = document.getElementById('loginForm');

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userName = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;
        const response = await getDataUser(userName, password);
        const userData = await response.json();
        if (userData.accessToken){
            sessionStorage.setItem("accessToken", userData.accessToken);
            location.href ='./admin/indexAdmin.html';
        } else {
            alert('Usuario y/o Contraseña Incorrectos');
            location.href ='login.html';
        }
    });
});

export const getDataUser = async (userName, password) => {
    try {
        let response = await fetch(`${URL_API}/api/getUsers`, {
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