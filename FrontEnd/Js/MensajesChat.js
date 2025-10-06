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