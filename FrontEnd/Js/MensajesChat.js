export function Resumen(texto){

    const html = marked.parse(texto);
    document.getElementById("Resumen").innerHTML = html;
    console.log("El mensaje es esto", texto);
}

// Esperar a que la página cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log("🔄 MensajesChat.js cargado, buscando resumen...");
    
    const resumenGuardado = localStorage.getItem('resumenIA');
    console.log("📦 Resumen guardado en localStorage:", resumenGuardado);
    
    if (resumenGuardado) {
        Resumen(resumenGuardado);
        // Opcional: limpiar el localStorage después de usarlo
        // localStorage.removeItem('resumenIA');
    } else {
        console.log("❌ No se encontró resumen en localStorage");
        document.getElementById("Resumen").innerText = "No se pudo cargar el resumen";
    }
});

//Seccion de chat
const Mensajes = document.getElementById('messages');
const inputEl = document.getElementById('inputMsg');
const btnenviar = document.getElementById('sendBtn');
const estado = document.getElementById('estado');

function AgregarMensaje(text, who){
    const wrap = document.createElement('div');

    wrap.className = 'msg' + who;
    wrap.innerHTML = `<div class=text> ${text}</div>`;
    Mensajes.appendChild(wrap);
    Mensajes.scrollTo = Mensajes.scrollHeight;
}

function escapeHtml(texto){
    return texto.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function EnviarMensaje(){
    const texto = inputEl.value.trim();

    if(!texto) return;
    AgregarMensaje(texto, 'user');
    inputEl.value = '';
    inputEl.focus();
    estado.textContent = 'Escribiendo ...';

    try{
        
        const response = await fetch(`http://127.0.0.1:8000/Chat/?mensaje=${texto}`);
        if (!response.ok) {
            throw new Error("Error en la llamada: " + response.status);
        }

        const data = await response.json();

        console.log("mensaje recibido: " + data.mensaje)

        const respuestaHTML = marked.parse(data.mensaje);

        AgregarMensaje(respuestaHTML, 'bot');



    }
    catch(Error){
       console.log("Ocurrio un error en el mensaje". Error)

    }
    finally{
        estado.textContent = 'Listo';
    }
}

btnenviar.addEventListener('click', EnviarMensaje);

inputEl.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter'){
        e.preventDefault();
        EnviarMensaje();
    }
});

