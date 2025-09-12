const URL_API = 'https://moto-la-103-server.vercel.app';

window.addEventListener('load', async () => {
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken !== undefined && sessionToken !== null && sessionToken !== 'null') {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const productId = urlParams.get('productId');
        console.log(productId)
        const data = await getDataProductById(productId);
        console.log(data);
        const id_input = document.getElementById('id_product');
        const img_input = document.getElementById('imagen');
        const name_input = document.getElementById('nombre_product');
        const price_input = document.getElementById('precio');
        const category_input = document.getElementById('category');

        id_input.value = data._id;
        img_input.value = data.imagen;
        name_input.value = data.nombre;
        price_input.value = Number(data.precio);
        category_input.value = data.categoria;

        const formUpdateProduct = document.getElementById('formEditProduct');

        formUpdateProduct.addEventListener("submit", async (event) => {
            event.preventDefault();
            await updateProdcutData(img_input.value, name_input.value, price_input.value, category_input.value);
            alert('Los datos del producto han sido actualizados correctamente');
            location.href = '/pages/admin/indexAdmin.html';
        });
    } else {
        alert('Por favor Iniciar Sesión');
        location.href = '../login.html';
    }
});

const getDataProductById = async (id) => {
    try {
        const sessionToken = sessionStorage.getItem('accessToken');
        let response = await fetch(`${URL_API}/api/products/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                },
            });
        return await response.json();
    } catch (error) {
        console.error('Hubo un error');
    }
}

const updateProdcutData = async (img, name, price, category) => {
    try {
        const sessionToken = sessionStorage.getItem('accessToken');
        let response = await fetch(`${URL_API}/api/products?nombre=${name}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${sessionToken}`
                },
                body: JSON.stringify({
                    imagen: img,
                    nombre: name,
                    precio: Number(price),
                    categoria: category,
                }),
            });
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
};