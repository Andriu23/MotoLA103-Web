/*const URL_API = 'https://moto-la-103-server.vercel.app';*/

export const crearProductos = (nombre, precio, imagen, categoria) => {
    const articulo = document.createElement('article');
    articulo.setAttribute('class', 'articulo');

    const img = document.createElement('img');
    img.setAttribute('class', 'articulo_img');
    img.setAttribute('src', imagen);
    img.setAttribute('alt', 'Imagen del producto');

    const detalles = document.createElement('div');
    detalles.setAttribute('class', 'articulo_detalles');

    const nombreProducto = document.createElement('h3');
    nombreProducto.setAttribute('class', 'articulo_detalles_nombre');
    nombreProducto.textContent = nombre;

    const categoriaProducto = document.createElement('p');
    categoriaProducto.setAttribute('class', 'articulo_detalles_categoria');
    categoriaProducto.textContent = categoria;

    const precioProducto = document.createElement('p');
    precioProducto.setAttribute('class', 'articulo_detalles_precio');

    const precioFuerte = document.createElement('strong');
    precioFuerte.setAttribute('class', 'articulo_detalles_precio_unidad');
    precioFuerte.textContent = `$${precio.toLocaleString()} COP`;

    precioProducto.appendChild(precioFuerte);

    const botones = document.createElement('div');
    botones.setAttribute('class', 'articulo_detalles_boton');

    const botonVer = document.createElement('button');
    botonVer.setAttribute('class', 'articulo_detalles_boton_ver');
    botonVer.setAttribute('type', 'button');
    botonVer.textContent = 'Ver detalles';

    const botonAñadir = document.createElement('button');
    botonAñadir.setAttribute('class', 'articulo_detalles_boton_añadir');
    botonAñadir.setAttribute('type', 'button');
    botonAñadir.setAttribute('aria-label', 'Añadir al carrito');
    botonAñadir.textContent = '🛒';

    botones.appendChild(botonVer);
    botones.appendChild(botonAñadir);

    detalles.appendChild(nombreProducto);
    detalles.appendChild(categoriaProducto);
    detalles.appendChild(precioProducto);
    detalles.appendChild(botones);

    articulo.appendChild(img);
    articulo.appendChild(detalles);

    const contenedor = document.getElementById('productos');
    if (contenedor) {
        contenedor.appendChild(articulo);
    }
};

export const fetchProductosData = (productosDataPayload) => {
    if (productosDataPayload.length > 0) {
        productosDataPayload.forEach(producto => {
            crearProductos(producto.nombre, producto.precio, producto.imagen, producto.categoria);
        });
    }
};

export const getDataProducts = async () => {
    try {
        let response = await fetch('http://localhost:3000/api/products');
        return await response.json();
    } catch (error) {
        console.error('Hubo un error');
    }
}
