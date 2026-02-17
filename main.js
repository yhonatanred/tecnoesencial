// ==========================================
// 🔧 PANEL DE DATOS (BASE DE DATOS)
// ==========================================

const telefonoEmpresa = "573173669002"; // Tu WhatsApp

// 1. LISTA DE SERVICIOS (Actualizada con tus precios)
const servicios = [
    // --- PORTÁTILES ---
    {
        titulo: "Mantenimiento Software Portátil",
        categoria: "PORTÁTIL",
        descripcion: "<ul><li>Revisión a domicilio</li><li>Eliminar programas ocultos/innecesarios</li><li>Corregir errores de sistema</li><li>Limpieza y optimización</li><li>Actualizar antivirus</li></ul>",
        precio: "$80.000",
        imagen: "https://www.prensalibre.com/wp-content/uploads/2022/03/Mantenimiento-computadoras-03.jpg?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Mantenimiento Físico Portátil",
        categoria: "PORTÁTIL",
        descripcion: "<ul><li>Eliminación de sulfato en circuitos</li><li>Lubricación sistema de refrigeración</li><li>Limpieza total de polvo interno</li><li>Limpieza carcasa/teclado/pantalla</li><li>Cambio de pasta térmica</li></ul>",
        precio: "$130.000",
        imagen: "https://gruposervice.com.uy/blog/files/mantenimiento-de-computadoras-img-1.webp?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Mantenimiento Total Portátil",
        categoria: "PORTÁTIL",
        descripcion: "<ul><li>Limpieza profunda de partes (Desensamble)</li><li>Mejorar rendimiento de Windows</li><li>Corrección fallas de software</li><li>Ensamble partes nuevas (si requiere)</li></ul>",
        precio: "$180.000",
        imagen: "https://sotein.com.co/wp-content/uploads/2020/07/sotein-Formateo-y-mantenimiento-de-computadoras.jpg?auto=format&fit=crop&w=500&q=60"
    },

    // --- PC DE ESCRITORIO ---
    {
        titulo: "Mantenimiento Software PC",
        categoria: "ESCRITORIO",
        descripcion: "<ul><li>Revisión a domicilio</li><li>Eliminar programas ocultos</li><li>Corregir errores de sistema</li><li>Programas de limpieza</li><li>Actualizar antivirus</li></ul>",
        precio: "$65.000",
        imagen: "https://www.doctorcomputador.com/wp-content/uploads/2024/11/mantenimiento-software.jpg?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Mantenimiento Físico PC",
        categoria: "ESCRITORIO",
        descripcion: "<ul><li>Eliminación de sulfato en circuitos</li><li>Lubricación refrigeración</li><li>Limpieza polvo interno</li><li>Limpieza teclado/ratón/monitor</li><li>Cambio de pasta térmica</li></ul>",
        precio: "$140.000",
        imagen: "https://tecnologia-informatica.com/wp-content/uploads/2018/09/mantenimiento-computadoras-16.jpeg?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Mantenimiento Total PC",
        categoria: "ESCRITORIO",
        descripcion: "<ul><li>Desensamble y limpieza total</li><li>Acelerar programas y Windows</li><li>Corrección fallas software</li><li>Limpieza periféricos</li><li>Ensamble partes nuevas (si requiere)</li></ul>",
        precio: "$170.000",
        imagen: "https://magnasolutio.com.co/blog/wp-content/uploads/2017/12/mantenimiento-computadores.jpg?auto=format&fit=crop&w=500&q=60"
    },

    // --- APPLE (MAC) ---
    {
        titulo: "Mantenimiento Sistema MacOS",
        categoria: "APPLE",
        descripcion: "<ul><li>Revisión iMac/MacBook a domicilio</li><li>Programas de limpieza</li><li>Corregir errores sistema operativo</li><li>Eliminar archivos ocultos</li><li>Actualizar seguridad</li></ul>",
        precio: "$150.000",
        imagen: "https://www.mactualidad.com/wp-content/uploads/2015/02/mantenimiento-mac.jpg?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Mantenimiento Físico Mac",
        categoria: "APPLE",
        descripcion: "<ul><li>Eliminación sulfato en circuitos</li><li>Lubricación refrigeración</li><li>Limpieza total polvo</li><li>Limpieza periféricos</li><li>Cambio pasta térmica</li></ul>",
        precio: "$240.000",
        imagen: "https://boluda.com/files/mantenimiento-macos.jpg?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Mantenimiento Total Mac",
        categoria: "APPLE",
        descripcion: "<ul><li>Limpieza interna componentes</li><li>Mejorar rendimiento MacOS</li><li>Ensamble partes nuevas (si requiere)</li><li>Servicio Premium a domicilio</li></ul>",
        precio: "$350.000",
        imagen: "https://istore.com.pe/cdn/shop/products/ManSoftHardMac_10876543-872a-41ef-a49d-98ebc128d55b.jpg?v=1657272049?auto=format&fit=crop&w=500&q=60"
    },

    // --- FORMATEO Y SISTEMAS ---
    {
        titulo: "Formatear e Instalar Windows",
        categoria: "SISTEMAS",
        descripcion: "<ul><li>Instalación Windows más ÓPTIMO</li><li>Eliminar programas basura</li><li>Programas básicos + Antivirus</li><li>Backup temporal de archivos</li></ul>",
        precio: "$150.000",
        imagen: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/MSFT-Several-Windows-11-PCs-RW10Y2x?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Formatear e Instalar MacOS",
        categoria: "SISTEMAS",
        descripcion: "<ul><li>Instalación MacOS más ÓPTIMO</li><li>Programas básicos + Limpieza</li><li>Backup temporal archivos</li><li>Corregir errores de software</li></ul>",
        precio: "$240.000",
        imagen: "https://macservicebcn.com/wp-content/uploads/2024/01/Configurando-un-Macbook-Air.png?auto=format&fit=crop&w=500&q=60"
    },

    // --- INSTALACIÓN DE SOFTWARE ---
    {
        titulo: "Pack Programas Básicos",
        categoria: "SOFTWARE",
        descripcion: "<ul><li>VLC, Teams, Chrome/Firefox</li><li>Office 2013 + Lector PDF</li><li>WinRAR + CCleaner</li><li>Antivirus (1 Mes)</li></ul>",
        precio: "$70.000",
        imagen: "https://www.aqfdesarrollo.com/aqfdesarrollo/img/aplicaciones-escritorio.jpg?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Programas de Diseño",
        categoria: "SOFTWARE",
        descripcion: "<ul><li>Photoshop, Premiere, Audition</li><li>Illustrator, After Effects</li><li>CorelDRAW</li><li>*Precio por programa individual</li></ul>",
        precio: "$60.000 c/u",
        imagen: "https://www.comparapps.com/wp-content/uploads/2022/06/Programas-De-Diseno-Grafico.png?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Software Arquitectura",
        categoria: "SOFTWARE",
        descripcion: "<ul><li>Autodesk Revit</li><li>SolidWorks</li><li>AutoCAD</li><li>3ds Max</li><li>*Precio por programa individual</li></ul>",
        precio: "$40.000 c/u",
        imagen: "https://blog-es.lac.tdsynnex.com/wp-content/uploads/2023/12/160714_Blog.png?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Licencia Office 365",
        categoria: "SOFTWARE",
        descripcion: "<ul><li>Word, Excel, PowerPoint</li><li>Outlook, Access, OneNote</li><li>Microsoft Project</li></ul>",
        precio: "$80.000",
        imagen: "https://3clics.co/images/stories/virtuemart/product/1366_2000.jpg?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Antivirus Anual",
        categoria: "SEGURIDAD",
        descripcion: "<ul><li>Protección tiempo real</li><li>Firewall y Anti-Malware</li><li>Protección amenazas web</li><li>Prevención de exploits</li></ul>",
        precio: "$90.000",
        imagen: "https://www.softzone.es/app/uploads-softzone.es/2018/07/Antivirus-Windows.jpg?auto=format&fit=crop&w=500&q=60"
    }
];

// 2. PRODUCTOS (TIENDA)
const productos = [
    // --- ACCESORIOS ---
    {
        titulo: "Disco Sólido SSD 240GB",
        categoria: "ACCESORIOS",
        descripcion: "Aumenta la velocidad de tu equipo hasta 10 veces más.",
        precio: "$130.000",
        imagen: "https://hardzone.es/app/uploads-hardzone.es/2018/07/SSD-discos-duros-mec%C3%A1nicos-01-1200x675.jpg?auto=format&fit=crop&w=500&q=60"
    },{
        titulo: "Disco Sólido SSD 480GB",
        categoria: "ACCESORIOS",
        descripcion: "Aumenta la velocidad de tu equipo hasta 10 veces más.",
        precio: "$170.000",
        imagen: "https://hardzone.es/app/uploads-hardzone.es/2018/07/SSD-discos-duros-mec%C3%A1nicos-01-1200x675.jpg?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Memoria RAM 8GB",
        descripcion: "Módulos DDR4 para portátiles y escritorio.",
        precio: "$110.000",
        imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=60"
    },
    {
        titulo: "Memoria RAM 4GB",
        descripcion: "Módulos DDR4 para portátiles y escritorio.",
        precio: "$80.000",
        imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=60"
    },

    // --- SEGURIDAD CCTV ---
    {
        titulo: "Kit Cámaras Dahua CCTV",
        categoria: "SEGURIDAD",
        descripcion: "<ul><li>DVR 4 Canales 1080p</li><li>4 Cámaras (Domo/Bala)</li><li>50m Cable + Accesorios</li><li>*Cotizar instalación aparte</li></ul>",
        precio: "$850.000",
        imagen: "https://cdn.tvc.mx/media/194815/kit-de-cctv-Dahua-de-4-Canales-DAD1340033.png?auto=format&fit=crop&w=500&q=60"
    }
];

// 3. TESTIMONIOS
const testimonios = [
    { nombre: "Carlos A.", texto: "Mi portátil estaba para tirar, le hicieron mantenimiento total y ahora vuela." },
    { nombre: "Laura M.", texto: "Excelente servicio a domicilio en Jamundí. Muy profesionales." },
    { nombre: "Andrés R.", texto: "Instalaron las cámaras de seguridad en mi negocio super rápido." }
];

// ==========================================
// 🤖 CEREBRO DE LA IA (CHATBOT)
// ==========================================
// ==========================================
// 🤖 CEREBRO DE LA IA (CHATBOT MEJORADO V2.0)
// ==========================================

function responderChat() {
    const input = document.getElementById('user-input');
    const mensajeUsuario = input.value.toLowerCase(); // Convertir a minúsculas para entender mejor
    const chatBox = document.getElementById('chat-box');

    // Evitar mensajes vacíos
    if (mensajeUsuario.trim() === "") return;

    // 1. Mostrar lo que el usuario escribió
    chatBox.innerHTML += `<div class="msg-user">${input.value}</div>`;
    input.value = ""; // Limpiar la caja de texto

    // 2. Lógica de Respuestas (INTELIGENCIA)
    let respuestaIA = "";
    let sugerencia = ""; // Variable para agregar info extra

    // --- BLOQUE 1: MANTENIMIENTO Y LENTITUD ---
    if (mensajeUsuario.includes("lento") || mensajeUsuario.includes("traba") || mensajeUsuario.includes("pegado") || mensajeUsuario.includes("virus")) {
        respuestaIA = "Si tu equipo está lento o se bloquea, seguramente necesita nuestro <b>Mantenimiento Total</b> o una optimización de sistema. También revisamos virus.";
        sugerencia = "Te recomiendo revisar el paquete de $160.000 o $170.000 en la sección de servicios.";
    } 
    
    // --- BLOQUE 2: REPARACIÓN FÍSICA (BISAGRAS, CARCASAS) ---
    else if (mensajeUsuario.includes("bisagra") || mensajeUsuario.includes("tapa") || mensajeUsuario.includes("carcasa") || mensajeUsuario.includes("partid") || mensajeUsuario.includes("roto") || mensajeUsuario.includes("caida")) {
        respuestaIA = "¡Sí! Somos expertos en reconstrucción. Arreglamos <b>bisagras, pastas y carcasas</b> de portátiles para que abran y cierren perfecto, sin tener que comprar uno nuevo.";
        sugerencia = "Por favor envíanos una foto del daño al WhatsApp para cotizarte la reconstrucción.";
    }

    // --- BLOQUE 3: FORMATEO E INSTALACIONES ---
    else if (mensajeUsuario.includes("formate") || mensajeUsuario.includes("windows") || mensajeUsuario.includes("office") || mensajeUsuario.includes("instalar") || mensajeUsuario.includes("word")) {
        respuestaIA = "Realizamos formateo profesional e instalación de programas. Instalamos Windows 10/11, Office, Antivirus y programas de diseño (Adobe, Corel, AutoCAD).";
        sugerencia = "El servicio incluye respaldo de información si lo necesitas.";
    }

    // --- BLOQUE 4: VENTA DE ACCESORIOS Y PARTES ---
    else if (mensajeUsuario.includes("mouse") || mensajeUsuario.includes("teclado") || mensajeUsuario.includes("disco") || mensajeUsuario.includes("ssd") || mensajeUsuario.includes("ram") || mensajeUsuario.includes("cargador") || mensajeUsuario.includes("bateria") || mensajeUsuario.includes("camara web") || mensajeUsuario.includes("diadema")) {
        respuestaIA = "En nuestra tienda tecnológica conseguimos de todo: Teclados, Mouse, Discos Sólidos (SSD), Memorias RAM, Cargadores y Baterías. Todo con garantía.";
        sugerencia = "¿Buscas alguna referencia en especial? Escríbeme al WhatsApp y te paso precio y foto.";
    }

    // --- BLOQUE 5: VENTA DE COMPUTADORES (NUEVOS Y USADOS) ---
    else if (mensajeUsuario.includes("comprar") || mensajeUsuario.includes("vendo") || mensajeUsuario.includes("precio de computador") || mensajeUsuario.includes("portatil nuevo") || mensajeUsuario.includes("usado")) {
        respuestaIA = "Manejamos venta de equipos tecnológicos. Tenemos <b>computadores nuevos y usados</b> con garantía, listos para trabajar o jugar.";
        sugerencia = "Dime qué presupuesto tienes o para qué usas el equipo, y te envío opciones al WhatsApp.";
    }

    // --- BLOQUE 6: EMPRESAS Y CÁMARAS DE SEGURIDAD (CCTV) ---
    else if (mensajeUsuario.includes("camara") || mensajeUsuario.includes("seguridad") || mensajeUsuario.includes("cctv") || mensajeUsuario.includes("empresa") || mensajeUsuario.includes("negocio")) {
        respuestaIA = "Ofrecemos soluciones empresariales: Instalación de circuitos cerrados (CCTV), mantenimiento de redes y soporte técnico para oficinas.";
        sugerencia = "Podemos agendar una visita técnica para valorar la seguridad de tu empresa.";
    }

    // --- BLOQUE 7: UBICACIÓN Y DOMICILIO ---
    else if (mensajeUsuario.includes("donde") || mensajeUsuario.includes("ubicacion") || mensajeUsuario.includes("direccion") || mensajeUsuario.includes("domicilio")) {
        respuestaIA = "Operamos principalmente con <b>Servicio a Domicilio</b> en todo Cali y Jamundí. Vamos hasta tu casa u oficina para recoger o reparar el equipo.";
    }

    // --- BLOQUE 8: SALUDOS ---
    else if (mensajeUsuario.includes("hola") || mensajeUsuario.includes("buenos") || mensajeUsuario.includes("buenas")) {
        respuestaIA = "¡Hola! Soy el asistente virtual de TECNOESENCIAL. Puedo ayudarte con mantenimiento, venta de accesorios, cámaras de seguridad o reparación de partes.";
        sugerencia = "¿En qué te puedo ayudar hoy?";
    }

    // --- DEFAULT (NO ENTENDIÓ) ---
    else {
        respuestaIA = "Entiendo que necesitas algo específico. Si es tecnología, ¡seguro lo tenemos o lo conseguimos!";
        sugerencia = "Por favor presiona el botón de abajo para hablar con un humano en WhatsApp.";
    }

    // 3. Renderizar respuesta con efecto de "Escribiendo..."
    // Creamos un link específico con el tema de la conversación
    const linkWa = `https://wa.me/${telefonoEmpresa}?text=Hola Tecnoesencial, estaba hablando con su IA sobre: ${mensajeUsuario}`;
    
    setTimeout(() => {
        chatBox.innerHTML += `
            <div class="msg-bot">
                ${respuestaIA}
                <br>
                <small style="color:#aaa; font-style:italic;">${sugerencia}</small>
                <br><br>
                <a href="${linkWa}" target="_blank" class="chat-btn-action">
                    <i class="fab fa-whatsapp"></i> Hablar con un Asesor
                </a>
            </div>
        `;
        // Auto-scroll al final
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
}

document.getElementById("user-input")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") responderChat();
});

// ==========================================
// ⚙️ RENDERIZADO DE PÁGINA (LÓGICA)
// ==========================================

function renderizarTarjetas(datos, contenedorID, tipo) {
    const contenedor = document.getElementById(contenedorID);
    if (!contenedor) return; // Protección por si no existe el ID
    
    contenedor.innerHTML = ""; // Limpiar antes de cargar

    datos.forEach(item => {
        // Mensaje personalizado para WhatsApp
        const mensaje = `Hola Tecnoesencial, me interesa el ${tipo}: ${item.titulo} (${item.precio})`;
        const linkWhatsApp = `https://wa.me/${telefonoEmpresa}?text=${encodeURIComponent(mensaje)}`;
        
        // Etiqueta de Categoría (Solo si existe)
        const catLabel = item.categoria ? `<span class="card-category" style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.8); color:#00f3ff; padding:2px 8px; border-radius:4px; font-size:0.7rem; border:1px solid #00f3ff;">${item.categoria}</span>` : '';

        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        
        // AQUÍ ESTÁ LA CLAVE: Usamos innerHTML en la descripción para que funcionen las listas <ul>
        tarjeta.innerHTML = `
            ${catLabel}
            <img src="${item.imagen}" alt="${item.titulo}" class="card-img-top">
            <h3>${item.titulo}</h3>
            <div style="font-size:0.9rem; color:#ccc; margin-bottom:15px; text-align:left;">${item.descripcion}</div>
            <span class="price" style="display:block; font-size:1.5rem; color:white; font-weight:bold; margin-bottom:15px;">${item.precio}</span>
            <a href="${linkWhatsApp}" class="btn-card" target="_blank" style="display:block; width:100%; text-align:center; padding:10px; background:linear-gradient(90deg, #111, #222); border:1px solid #bc13fe; color:white; text-decoration:none; border-radius:8px;">
                <i class="fab fa-whatsapp"></i> Lo quiero
            </a>
        `;
        
        contenedor.appendChild(tarjeta);
    });
}

// Cargar todo al iniciar
document.addEventListener('DOMContentLoaded', () => {
    renderizarTarjetas(servicios, 'contenedor-servicios', 'servicio');
    renderizarTarjetas(productos, 'contenedor-productos', 'producto');

    // Cargar Testimonios
    const boxTestimonios = document.getElementById('contenedor-testimonios');
    if (boxTestimonios) {
        testimonios.forEach(item => {
            boxTestimonios.innerHTML += `
                <div class="testimonio-card" style="background:rgba(20,20,35,0.8); padding:20px; border-radius:10px; border-left:4px solid #00f3ff; margin-bottom:10px;">
                    <p style="font-style:italic; color:#ddd; margin-bottom:10px;">"${item.texto}"</p>
                    <div style="font-weight:bold; color:#00f3ff;">${item.nombre}</div>
                </div>
            `;
        });
    }
});