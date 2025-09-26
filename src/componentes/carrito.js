// === VARIABLES GLOBALES ===
const URL_API = 'https://moto-la-103-server.vercel.app';
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // persistencia

// nodos principales
const btnCarrito = document.querySelector('.header_usuario_carrito');
const productosSection = document.querySelector('.productos');
const carritoSection = document.getElementById('carrito');
const carritoItems = document.getElementById('carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const spanTotalHeader = document.querySelector('.header_usuario_total');
const detalleSection = document.getElementById('detalle-producto');
const detalleContenido = document.getElementById('detalle-contenido');
const inputBusqueda = document.getElementById('buscar-producto'); // tu input “¿Qué estás buscando?”

// productos cargados
let productosCargados = []; // array para filtros y búsqueda

// === FUNCIONES PARA CREAR PRODUCTOS ===
export const crearProductos = (nombre, precio, imagen, categoria) => {
    const articulo = document.createElement('article');
    articulo.className = 'articulo';
    articulo.dataset.categoria = categoria;
    articulo.dataset.nombre = nombre.toLowerCase(); // para búsqueda

    const img = document.createElement('img');
    img.className = 'articulo_img';
    img.src = imagen;
    img.alt = 'Imagen del producto';

    const detalles = document.createElement('div');
    detalles.className = 'articulo_detalles';

    const nombreProducto = document.createElement('h3');
    nombreProducto.className = 'articulo_detalles_nombre';
    nombreProducto.textContent = nombre;

    const categoriaProducto = document.createElement('p');
    categoriaProducto.className = 'articulo_detalles_categoria';
    categoriaProducto.textContent = categoria;

    const precioProducto = document.createElement('p');
    const precioFuerte = document.createElement('strong');
    precioFuerte.className = 'articulo_detalles_precio_unidad';
    precioFuerte.textContent = `$${precio.toLocaleString()} COP`;
    precioProducto.appendChild(precioFuerte);

    const botones = document.createElement('div');
    botones.className = 'articulo_detalles_boton';

    const botonVer = document.createElement('button');
    botonVer.className = 'articulo_detalles_boton_ver';
    botonVer.type = 'button';
    botonVer.textContent = 'Ver detalles';

    const botonAñadir = document.createElement('button');
    botonAñadir.className = 'articulo_detalles_boton_añadir';
    botonAñadir.type = 'button';
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
    if (contenedor) contenedor.appendChild(articulo);

    // eventos
    botonAñadir.addEventListener('click', () => {
        addToCart(nombre, precio, categoria);
    });

    botonVer.addEventListener('click', () => {
        mostrarDetalle(nombre, precio, imagen, categoria);
    });
};

export const fetchProductosData = (productosDataPayload) => {
    if (productosDataPayload.length > 0) {
        productosCargados = productosDataPayload; // guardar para búsqueda
        productosDataPayload.forEach(producto => {
            crearProductos(producto.nombre, producto.precio, producto.imagen, producto.categoria);
        });
    }
};

export const getDataProducts = async () => {
    try {
        let response = await fetch(`${URL_API}/api/products`);
        return await response.json();
    } catch (error) {
        console.error('Hubo un error');
    }
};

// === CARRITO ===
function addToCart(nombre, precio, categoria) {
    const existe = carrito.find(item => item.nombre === nombre);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ nombre, precio, categoria, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarrito();
    mostrarCarrito();
}

function actualizarCarrito() {
    carritoItems.innerHTML = '';
    let total = 0;
    let totalCantidad = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        totalCantidad += item.cantidad;

        carritoItems.innerHTML += `
        <tr>
            <td data-label="Producto">${item.nombre}</td>
            <td data-label="Categoría">${item.categoria}</td>
            <td data-label="Precio">$${item.precio.toLocaleString()}</td>
            <td data-label="Cantidad">
                <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="input-cantidad">
            </td>
            <td data-label="Subtotal">$${subtotal.toLocaleString()}</td>
            <td data-label="Acción">
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </td>
        </tr>`;
    });

    // Actualizar totales
    carritoTotal.textContent = `$${total.toLocaleString()} COP`;
    spanTotalHeader.textContent = `$${total.toLocaleString()} COP`;
    btnCarrito.setAttribute('aria-label', `Ver carrito (${totalCantidad} productos)`);

    // 👇 NUEVO: actualizar cantidad global en el navbar
    const cantidadGlobal = document.getElementById('cantidad-global');
    if (cantidadGlobal) {
        cantidadGlobal.textContent = totalCantidad;
    }

    // Guardar en localStorage para otras páginas
    localStorage.setItem('carritoTotal', total);
    localStorage.setItem('cantidadCarrito', totalCantidad);

    // actualizar cantidad al cambiar input
    document.querySelectorAll('.input-cantidad').forEach(input => {
        input.addEventListener('input', e => {
            const index = e.target.dataset.index;
            carrito[index].cantidad = parseInt(e.target.value);
            guardarCarrito();
            actualizarCarrito();
        });
    });

    // eliminar producto
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', e => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            guardarCarrito();
            actualizarCarrito();
        });
    });
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// === MOSTRAR/OCULTAR CARRITO Y DETALLES ===
btnCarrito.addEventListener('click', mostrarCarrito);

function mostrarCarrito() {
    // mostrar la sección del carrito
    productosSection.style.display = 'none';
    detalleSection.style.display = 'none';
    carritoSection.style.display = 'block';

    // hacer scroll suave hacia la sección del carrito
    carritoSection.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('limpiar-carrito').addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
});

document.getElementById('volver-productos').addEventListener('click', () => {
    carritoSection.style.display = 'none';
    productosSection.style.display = 'block';
});

function mostrarDetalle(nombre, precio, imagen, categoria) {
    productosSection.style.display = 'none';
    carritoSection.style.display = 'none';
    detalleSection.style.display = 'block';

    detalleContenido.innerHTML = `
    <div class="tarjeta-detalle">
        <img src="${imagen}" alt="${nombre}" style="width:250px;">
        <h3>${nombre}</h3>
        <p>Categoría: ${categoria}</p>
        <p>Precio: $${precio.toLocaleString()} COP</p>
        <button id="añadir-detalle">Añadir al carrito</button>
    </div>`;
    document.getElementById('añadir-detalle').addEventListener('click', () => {
        addToCart(nombre, precio, categoria);
    });
}

document.getElementById('volver-listado').addEventListener('click', () => {
    detalleSection.style.display = 'none';
    productosSection.style.display = 'block';
});

// === FILTRO DE CATEGORÍAS ===
document.querySelectorAll('input[name="categoria"]').forEach(chk => {
    chk.addEventListener('change', () => {
        aplicarFiltrosYBusqueda();
    });
});

// === BÚSQUEDA ===
if (inputBusqueda) {
    inputBusqueda.addEventListener('input', () => {
        aplicarFiltrosYBusqueda();
    });
}

function aplicarFiltrosYBusqueda() {
    const seleccionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
        .map(c => c.nextElementSibling.textContent.trim());

    const textoBusqueda = inputBusqueda ? inputBusqueda.value.toLowerCase() : '';

    document.querySelectorAll('.articulo').forEach(card => {
        const categoria = card.querySelector('.articulo_detalles_categoria').textContent;
        const nombre = card.dataset.nombre.toLowerCase();
        const coincideCategoria = seleccionadas.length === 0 || seleccionadas.includes(categoria);
        const coincideBusqueda = nombre.includes(textoBusqueda);
        if (coincideCategoria && coincideBusqueda) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// === INICIO: CARGAR PRODUCTOS ===
(async () => {
    const productosData = await getDataProducts();
    fetchProductosData(productosData);
    actualizarCarrito(); // mostrar carrito persistido
})();


