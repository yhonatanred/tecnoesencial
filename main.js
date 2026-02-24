// 🔴🔴🔴 REEMPLAZA AQUÍ LA MISMA URL LARGA QUE USAS EN SISTEMA.HTML 🔴🔴🔴
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyW3DCk_VRl0vU-zZIqwmWAV38RJafJsJ_XI-vQDjAPah1ysv4Xjzt-1G0QZPWhfvl7/exec";

// Variables del carrito
let carrito = [];
const numeroWhatsAppEmpresa = "573173669002"; // Número de Cali/Colombia

// Formateador de moneda
const formatearDinero = (v) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v);

// ==========================================
// 1. CARGAR CATÁLOGO (SERVICIOS Y PRODUCTOS)
// ==========================================
async function cargarCatalogo() {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ accion: "obtener_catalogo_web" }) // Nueva función que crearemos en el Motor
        });
        const data = await response.json();
        
        if (data.status === "success") {
            renderizarServicios(data.servicios);
            renderizarProductos(data.productos);
        }
    } catch (error) {
        console.error("Error cargando el catálogo", error);
        document.getElementById('loader-servicios').innerHTML = "Error al cargar servicios.";
        document.getElementById('loader-productos').innerHTML = "Error al cargar productos.";
    }
}

function renderizarServicios(servicios) {
    const cont = document.getElementById('contenedor-servicios');
    document.getElementById('loader-servicios').style.display = "none";
    cont.innerHTML = "";

    servicios.forEach(srv => {
        let badge = srv.promocion === "Sí" ? `<span class="badge-promo"><i class="fas fa-star"></i> PROMOCIÓN</span>` : "";
        let btnCotizar = `<a href="https://wa.me/${numeroWhatsAppEmpresa}?text=Hola, me interesa el servicio de: ${srv.nombre}" class="btn-outline" target="_blank" style="display:block; text-align:center; margin-top:15px; text-decoration:none; padding:10px; border:1px solid #00f3ff; color:#00f3ff; border-radius:5px;">Cotizar</a>`;

        cont.innerHTML += `
            <div class="service-card" style="background: rgba(20,20,35,0.8); border: 1px solid rgba(0,243,255,0.3); border-radius: 10px; padding: 20px; text-align:center;">
                ${badge}
                <i class="${srv.icono}" style="font-size:3rem; color:#00f3ff; margin-bottom:15px;"></i>
                <h3 style="color:white; font-family:'Orbitron', sans-serif;">${srv.nombre}</h3>
                <p style="color:#aaa; font-size:0.9rem; margin-top:10px;">${srv.descripcion}</p>
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
        let img = prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:10px;">` : `<div style="height:150px; background:#111; border-radius:8px; margin-bottom:10px; display:flex; justify-content:center; align-items:center;"><i class="fas fa-box" style="font-size:3rem; color:#444;"></i></div>`;
        
        // Checkbox opcional de instalación
        let checkInstalacion = prod.requiere_instalacion === "Sí" ? `
            <label style="display:flex; align-items:center; gap:5px; font-size:0.8rem; color:#aaa; margin-bottom:10px; cursor:pointer;">
                <input type="checkbox" id="inst-${prod.id}" style="accent-color:#bc13fe;">
                ¿Cotizar Instalación Técnica?
            </label>
        ` : "";

        cont.innerHTML += `
            <div class="product-card" style="background: rgba(20,20,35,0.8); border: 1px solid rgba(188,19,254,0.3); border-radius: 10px; padding: 20px;">
                ${img}
                <h3 style="color:#00f3ff; font-family:'Rajdhani', sans-serif; font-size:1.2rem;">${prod.nombre}</h3>
                <p style="color:#aaa; font-size:0.8rem; margin:10px 0;">${prod.descripcion}</p>
                <div style="font-size:1.4rem; color:#bc13fe; font-weight:bold; margin-bottom:10px;">${formatearDinero(prod.precio)}</div>
                
                ${checkInstalacion}

                <button onclick="agregarAlCarrito('${prod.id}', '${prod.nombre}', ${prod.precio}, '${prod.requiere_instalacion}')" style="width:100%; padding:10px; background:linear-gradient(90deg, #bc13fe, #00f3ff); border:none; border-radius:5px; color:white; font-weight:bold; cursor:pointer;"><i class="fas fa-cart-plus"></i> Añadir a la Tienda</button>
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
    
    // Verificar si el cliente marcó el checkbox de instalación en la tarjeta del producto
    if (requiere_inst === "Sí") {
        const checkElement = document.getElementById(`inst-${id}`);
        if (checkElement && checkElement.checked) {
            instalacionPedida = true;
        }
    }

    // Añadir al array del carrito
    carrito.push({
        id: id,
        nombre: nombre,
        precio: parseFloat(precio) || 0,
        solicita_instalacion: instalacionPedida
    });

    actualizarUI_Carrito();
    alert(`¡${nombre} añadido a tu equipo!`);
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
        let badgeInst = item.solicita_instalacion ? `<br><span style="font-size:0.75rem; color:#ffaa00;"><i class="fas fa-tools"></i> Requiere Cotizar Instalación</span>` : "";
        
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
    let texto = `*NUEVO PEDIDO DE TIENDA TECNOESENCIAL* 🛒💻\n\n`;
    
    carrito.forEach((item, index) => {
        total += item.precio;
        let txtInstalacion = item.solicita_instalacion ? ` _(+ Solicita cotizar instalación)_` : "";
        texto += `${index + 1}. *${item.nombre}* - ${formatearDinero(item.precio)}${txtInstalacion}\n`;
    });

    texto += `\n*Total Estimado: ${formatearDinero(total)}*\n\nHola, me gustaría concretar esta compra.`;

    // Redirigir a WhatsApp
    const urlWa = `https://wa.me/${numeroWhatsAppEmpresa}?text=${encodeURIComponent(texto)}`;
    window.open(urlWa, '_blank');
    
    // Vaciar carrito
    carrito = [];
    actualizarUI_Carrito();
    toggleCart();
}

// Inicializar al cargar la página
window.onload = function() {
    cargarCatalogo();
};

// ==========================================
// 🤖 CEREBRO DE LA IA (CHATBOT)
// ==========================================
// ==========================================
// 🧠 CEREBRO REAL CON IA (GEMINI API)
// ==========================================

// 🔴 PEGA AQUÍ TU API KEY DE GOOGLE (DENTRO DE LAS COMILLAS)
const API_KEY = "AIzaSyCEII9lI8i4HlFPx_f7WsaWdODKUiuc-lU"; 

async function responderChat() {
    const input = document.getElementById('user-input');
    const mensajeUsuario = input.value;
    const chatBox = document.getElementById('chat-box');

    if (mensajeUsuario.trim() === "") return;

    // 1. Mostrar mensaje del usuario
    chatBox.innerHTML += `<div class="msg-user">${mensajeUsuario}</div>`;
    input.value = ""; 
    
    // Mostramos estado "Escribiendo..."
    const loadingId = "loading-" + Date.now();
    chatBox.innerHTML += `<div id="${loadingId}" class="msg-bot">Thinking... <i class="fas fa-spinner fa-spin"></i></div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. PREPARAR EL CONTEXTO (LO QUE LA IA DEBE SABER)
    // Convertimos tus servicios a texto para que la IA los lea
    const contextoNegocio = `
        Eres el asistente virtual experto y amable de la empresa TECNOESENCIAL en Cali y Jamundí.
        
        TUS REGLAS:
        1. Tu objetivo es vender y agendar citas por WhatsApp.
        2. Responde de forma corta, futurista y profesional (máximo 2 párrafos).
        3. Siempre invita al usuario a escribir al WhatsApp: ${telefonoEmpresa}.
        4. Solo recomiendas productos que estén en la siguiente lista. Si no está, di que podemos conseguirlo bajo pedido.

        LISTA DE SERVICIOS Y PRODUCTOS DISPONIBLES:
        ${JSON.stringify(servicios)}
        ${JSON.stringify(productos)}

        PREGUNTA DEL CLIENTE:
        "${mensajeUsuario}"
    `;

    try {
        // 3. CONECTAR CON GOOGLE GEMINI (EL CEREBRO)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: contextoNegocio }]
                }]
            })
        });

        const data = await response.json();
        
        // 4. OBTENER LA RESPUESTA INTELIGENTE
        const respuestaIA = data.candidates[0].content.parts[0].text;

        // Borrar el "Thinking..." y poner la respuesta real
        document.getElementById(loadingId).remove();

        // Convertir formato **negrita** de la IA a HTML <b>
        const respuestaFormateada = respuestaIA.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        const linkWa = `https://wa.me/${telefonoEmpresa}?text=Hola Tecnoesencial, su IA me recomendó esto: ${encodeURIComponent(mensajeUsuario)}`;

        chatBox.innerHTML += `
            <div class="msg-bot">
                ${respuestaFormateada}
                <br><br>
                <a href="${linkWa}" target="_blank" class="chat-btn-action">
                    <i class="fab fa-whatsapp"></i> Contactar Asesor Humano
                </a>
            </div>
        `;

    } catch (error) {
        console.error("Error IA:", error);
        document.getElementById(loadingId).innerHTML = "Lo siento, mis sistemas neuronales están recargados. Por favor escríbenos al WhatsApp directamente.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Permitir Enter para enviar
document.getElementById("user-input")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") responderChat();
});
