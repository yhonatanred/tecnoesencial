// 🔴🔴🔴 REEMPLAZA AQUÍ LA MISMA URL LARGA QUE USAS EN SISTEMA.HTML 🔴🔴🔴
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyW3DCk_VRl0vU-zZIqwmWAV38RJafJsJ_XI-vQDjAPah1ysv4Xjzt-1G0QZPWhfvl7/exec";

// Variables globales
let carrito = [];
const numeroWhatsAppEmpresa = "573173669002"; // Número de Cali/Colombia

// Memoria para que la IA sepa qué vendes
let listaServiciosIA = [];
let listaProductosIA = [];

// Formateador de moneda
const formatearDinero = (v) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v);

// ==========================================
// 1. CARGAR CATÁLOGO (CON CACHÉ ULTRA RÁPIDO)
// ==========================================
async function cargarCatalogo() {
    const catalogoGuardado = localStorage.getItem('tecno_catalogo_web');
    if (catalogoGuardado) {
        const data = JSON.parse(catalogoGuardado);
        listaServiciosIA = data.servicios; // Guardamos para la IA
        listaProductosIA = data.productos; // Guardamos para la IA
        renderizarServicios(data.servicios);
        renderizarProductos(data.productos);
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ accion: "obtener_catalogo_web" })
        });
        const data = await response.json();
        
        if (data.status === "success") {
            const dataString = JSON.stringify(data);
            if (catalogoGuardado !== dataString) {
                localStorage.setItem('tecno_catalogo_web', dataString);
                listaServiciosIA = data.servicios; // Actualizamos para la IA
                listaProductosIA = data.productos; // Actualizamos para la IA
                renderizarServicios(data.servicios);
                renderizarProductos(data.productos);
            }
        }
    } catch (error) {
        console.error("Error cargando el catálogo", error);
        if (!catalogoGuardado) {
            document.getElementById('loader-servicios').innerHTML = "Error al conectar con el servidor.";
            document.getElementById('loader-productos').innerHTML = "Error al conectar con el servidor.";
        }
    }
}

function renderizarServicios(servicios) {
    const cont = document.getElementById('contenedor-servicios');
    document.getElementById('loader-servicios').style.display = "none";
    cont.innerHTML = "";

    servicios.forEach(srv => {
        let badge = srv.promocion === "Sí" ? `<span class="badge-promo"><i class="fas fa-star"></i> PROMOCIÓN</span>` : "";
        
        let mediaVisual = "";
        let inputIcono = srv.icono ? srv.icono.toLowerCase() : "";
        
        if (inputIcono.includes("http") || inputIcono.includes(".jpg") || inputIcono.includes(".png") || inputIcono.includes(".webp")) {
            mediaVisual = `<img src="${srv.icono}" alt="${srv.nombre}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:15px; border: 1px solid rgba(0,243,255,0.3);">`;
        } else {
            let iconoClase = srv.icono ? srv.icono : "fas fa-tools";
            mediaVisual = `<div style="height:160px; display:flex; justify-content:center; align-items:center; margin-bottom:15px;"><i class="${iconoClase}" style="font-size:4rem; color:#00f3ff;"></i></div>`;
        }

        let btnCotizar = `<a href="https://wa.me/${numeroWhatsAppEmpresa}?text=Hola, me interesa cotizar el servicio de: ${srv.nombre}" class="btn-quote-service" target="_blank"><i class="fab fa-whatsapp"></i> Cotizar Servicio</a>`;

        cont.innerHTML += `
            <div class="service-card glass-card">
                ${badge}
                ${mediaVisual}
                <h3 style="color:white; font-family:'Orbitron', sans-serif;">${srv.nombre}</h3>
                <p style="color:#aaa; font-size:0.9rem; margin-top:10px; flex-grow:1;">${srv.descripcion}</p>
                <div style="font-size:1.3rem; color:#00f3ff; font-weight:bold; margin: 15px 0;">
                    ${formatearDinero(srv.precio)}
                </div>
                ${btnCotizar}
            </div>
        `;
    });
}

function renderizarProductos(productos) {
    const cont = document.getElementById('contenedor-productos');
    document.getElementById('loader-productos').style.display = "none";
    cont.innerHTML = "";

    productos.forEach(prod => {
        let img = prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:15px;">` : `<div style="height:160px; background:#111; border-radius:8px; margin-bottom:15px; display:flex; justify-content:center; align-items:center;"><i class="fas fa-box" style="font-size:3rem; color:#444;"></i></div>`;
        
        let checkInstalacion = prod.requiere_instalacion === "Sí" ? `
            <label style="display:flex; align-items:center; gap:5px; font-size:0.8rem; color:#aaa; margin-bottom:10px; cursor:pointer; justify-content:center;">
                <input type="checkbox" id="inst-${prod.id}" style="accent-color:#bc13fe;">
                ¿Cotizar Instalación Técnica?
            </label>
        ` : "";

        cont.innerHTML += `
            <div class="product-card glass-card" style="border-color: rgba(188,19,254,0.3);">
                ${img}
                <h3 style="color:#bc13fe; font-family:'Rajdhani', sans-serif; font-size:1.2rem; font-weight:bold;">${prod.nombre}</h3>
                <p style="color:#aaa; font-size:0.8rem; margin:10px 0; flex-grow:1;">${prod.descripcion}</p>
                <div style="font-size:1.4rem; color:white; font-weight:bold; margin-bottom:10px;">${formatearDinero(prod.precio)}</div>
                ${checkInstalacion}
                <button onclick="agregarAlCarrito('${prod.id}', '${prod.nombre}', ${prod.precio}, '${prod.requiere_instalacion}')" class="btn-add-cart"><i class="fas fa-cart-plus"></i> Añadir al Carrito</button>
            </div>
        `;
    });
}

// ==========================================
// 2. LÓGICA DEL CARRITO DE COMPRAS
// ==========================================
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('modal-hidden');
}

function agregarAlCarrito(id, nombre, precio, requiere_inst) {
    let instalacionPedida = false;
    if (requiere_inst === "Sí") {
        const checkElement = document.getElementById(`inst-${id}`);
        if (checkElement && checkElement.checked) {
            instalacionPedida = true;
        }
    }

    carrito.push({ id: id, nombre: nombre, precio: parseFloat(precio) || 0, solicita_instalacion: instalacionPedida });
    actualizarUI_Carrito();
    
    alert(`¡${nombre} añadido a tu carrito!`);
    if(document.getElementById('cart-modal').classList.contains('modal-hidden')){
        toggleCart();
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarUI_Carrito();
}

function actualizarUI_Carrito() {
    const cont = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-price');
    const badge = document.getElementById('cart-count');
    
    badge.innerText = carrito.length;
    
    if (carrito.length === 0) {
        cont.innerHTML = `<p style="text-align:center; color:#aaa; margin-top:20px;">Tu carrito está vacío.</p>`;
        totalEl.innerText = "$0";
        return;
    }

    cont.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        let badgeInst = item.solicita_instalacion ? `<br><span style="font-size:0.75rem; color:#ffaa00;"><i class="fas fa-tools"></i> Req. Instalación</span>` : "";
        
        cont.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.nombre}</div>
                    <div class="cart-item-price">${formatearDinero(item.precio)} ${badgeInst}</div>
                </div>
                <button class="btn-remove" onclick="eliminarDelCarrito(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
    });

    totalEl.innerText = formatearDinero(total);
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let total = 0;
    let texto = `*NUEVO PEDIDO WEB - TECNOESENCIAL* 🛒💻\n\n`;
    
    carrito.forEach((item, index) => {
        total += item.precio;
        let txtInstalacion = item.solicita_instalacion ? ` _(+ Solicita cotizar instalación)_` : "";
        texto += `▪️ *${item.nombre}* - ${formatearDinero(item.precio)}${txtInstalacion}\n`;
    });

    texto += `\n*Total Estimado: ${formatearDinero(total)}*\n\nHola, me gustaría concretar esta compra.`;

    const urlWa = `https://wa.me/${numeroWhatsAppEmpresa}?text=${encodeURIComponent(texto)}`;
    window.open(urlWa, '_blank');
    
    carrito = [];
    actualizarUI_Carrito();
    toggleCart();
}

// ==========================================
// 3. 🧠 CEREBRO REAL CON IA (AHORA SEGURO A TRAVÉS DE APPS SCRIPT)
// ==========================================
async function responderChat() {
    const input = document.getElementById('user-input');
    const mensajeUsuario = input.value;
    const chatBox = document.getElementById('chat-box');

    if (mensajeUsuario.trim() === "") return;

    chatBox.innerHTML += `<div class="msg-user">${mensajeUsuario}</div>`;
    input.value = ""; 
    
    const loadingId = "loading-" + Date.now();
    chatBox.innerHTML += `<div id="${loadingId}" class="msg-bot">Pensando... <i class="fas fa-spinner fa-spin"></i></div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    let resumenCatalogo = "SERVICIOS:\n";
    listaServiciosIA.forEach(s => resumenCatalogo += `- ${s.nombre} (${s.precio})\n`);
    resumenCatalogo += "\nPRODUCTOS:\n";
    listaProductosIA.forEach(p => resumenCatalogo += `- ${p.nombre} (${p.precio})\n`);

    const contextoNegocio = `
        Eres el asistente virtual experto y amable de la empresa TECNOESENCIAL en Cali, Palmira y Jamundí.
        TUS REGLAS:
        1. Tu objetivo es ayudar al cliente y agendar citas o ventas por WhatsApp.
        2. Responde de forma muy natural, corta, amigable y profesional (máximo 2 párrafos).
        3. SIEMPRE invita al usuario a escribir al WhatsApp: ${numeroWhatsAppEmpresa}.
        4. Trata de recomendar u orientar con base en este catálogo real de la empresa:
        
        CATÁLOGO DISPONIBLE:
        ${resumenCatalogo}

        Si piden algo que no está en la lista, di que "podemos revisarlo o conseguirlo bajo pedido comunicándose al WhatsApp".

        PREGUNTA DEL CLIENTE:
        "${mensajeUsuario}"
    `;

    try {
        // 🔥 AHORA LLAMAMOS AL SCRIPT SEGURO, NO A LA API DIRECTA
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ accion: "chatbot_ia", contexto: contextoNegocio })
        });

        const data = await response.json();
        document.getElementById(loadingId).remove();

        if (data.status === "success") {
            let respuestaFormateada = data.texto.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            respuestaFormateada = respuestaFormateada.replace(/\n/g, '<br>');

            const linkWa = `https://wa.me/${numeroWhatsAppEmpresa}?text=Hola Tecnoesencial, el asistente virtual me recomendó consultarte por esto: ${encodeURIComponent(mensajeUsuario)}`;

            chatBox.innerHTML += `
                <div class="msg-bot">
                    ${respuestaFormateada}
                    <br><br>
                    <a href="${linkWa}" target="_blank" class="chat-btn-action" style="border:1px solid #bc13fe; padding:5px 10px; border-radius:5px; color:white; text-decoration:none; display:inline-block; margin-top:10px;">
                        <i class="fab fa-whatsapp" style="color:#25D366;"></i> Contactar Asesor Humano
                    </a>
                </div>
            `;
        } else {
            throw new Error("Fallo en backend");
        }
    } catch (error) {
        console.error("Error IA:", error);
        document.getElementById(loadingId).innerHTML = "Mis sistemas neuronales están actualizándose. Por favor escríbenos al WhatsApp.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// INICIALIZACIÓN
window.onload = function() {
    cargarCatalogo();
    
    // Agregar evento para que el Chat funcione presionando la tecla "Enter"
    const inputChat = document.getElementById("user-input");
    if(inputChat) {
        inputChat.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                responderChat();
            }
        });
    }
};