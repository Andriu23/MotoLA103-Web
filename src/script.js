import { fetchDestacadosData } from "./componentes/main.js";
import { fetchProductosData, getDataProducts } from "./componentes/productos.js";


const productosData = '[{"nombre":"Casco Integral RS7 Pro","precio":320000},{"nombre":"Chaqueta Touring Impermeable","precio":290000},{"nombre":"Maletero Top Case 45L","precio":210000},{"nombre":"Luces LED Antiniebla Dual","precio":85000},{"nombre":"Intercomunicador MotoLink V3","precio":230000},{"nombre":"Kit de Herramientas Compacto","precio":55000},{"nombre":"Maniguetas Ajustables Racing","precio":72000},{"nombre":"Candado con Alarma SteelLock","precio":65000}]';

fetchDestacadosData(productosData);


window.addEventListener('load', async () => {
    const listaProductosData = await getDataProducts();
    fetchProductosData(listaProductosData); 
});