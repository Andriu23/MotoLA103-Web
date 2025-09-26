export const productosDestacados = (nombre, precio) => {
    const productoImg = document.createElement('article');
    const productoDetalles = document.createElement('div');
    const productoNombre = document.createElement('h4');
    const textNombre = document.createTextNode(nombre.toUpperCase());
    const productoPrecio = document.createElement('p');
    const precioStrong = document.createElement('strong');
    const textPrecio = document.createTextNode(`$ ${precio.toLocaleString()} COP`);

    // Asignación de clases
    productoImg.setAttribute('class', 'producto_articulo');
    productoDetalles.setAttribute('class', 'producto_articulo_detalles');
    productoNombre.setAttribute('class', 'producto_articulo_nombre');
    productoPrecio.setAttribute('class', 'producto_articulo_precio');
    precioStrong.setAttribute('class', 'producto_articulo_precio_unidad');

    // Armado del DOM
    precioStrong.appendChild(textPrecio);
    productoPrecio.appendChild(precioStrong);
    productoNombre.appendChild(textNombre);
    productoDetalles.appendChild(productoNombre);
    productoDetalles.appendChild(productoPrecio);
    productoImg.appendChild(productoDetalles);

    // Agregar al DOM
    const contenedor = document.getElementById('destacados');
    if (contenedor) {
        contenedor.appendChild(productoImg);
    }
};

// Cargar los productos desde JSON
export const fetchDestacadosData = (destadosDataPayload) => {
    const data = JSON.parse(destadosDataPayload);
    if (data.length > 0) {
        data.forEach(element => {
            productosDestacados(element.nombre, element.precio);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Leer valores guardados
    const totalGuardado = localStorage.getItem('carritoTotal');
    const cantidadGuardada = localStorage.getItem('cantidadCarrito');

    // Actualizar total global
    const totalGlobal = document.getElementById('total-global');
    if (totalGlobal) {
        totalGlobal.textContent = totalGuardado
            ? `$${parseInt(totalGuardado).toLocaleString()} COP`
            : '$0 COP';
    }

    // Actualizar cantidad global
    const cantidadGlobal = document.getElementById('cantidad-global');
    if (cantidadGlobal) {
        cantidadGlobal.textContent = cantidadGuardada || 0;
    }

    // === BOTÓN CARRITO EN CUALQUIER PÁGINA ===
    const btnCarrito = document.getElementById('btn-carrito');
    if (btnCarrito) {
        btnCarrito.addEventListener('click', (e) => {
            e.preventDefault();

            // Si estamos en productos.html (misma página)
            if (window.location.pathname.includes('productos.html')) {
                // hacer scroll al carrito
                const carritoSection = document.getElementById('carrito');
                if (carritoSection) {
                    carritoSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Si estamos en otra página, redirigir a productos.html#carrito
                window.location.href = '/pages/productos.html#carrito';
            }
        });
    }
});

