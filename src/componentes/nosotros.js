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