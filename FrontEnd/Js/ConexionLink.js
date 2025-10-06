

export async function PedirRespuesta(texto) {
    console.log("✅ Función PedirRespuesta ejecutándose");
    console.log("📝 Texto recibido:", texto);

    const linkLimpio = texto.trim();
    const codificado = encodeURIComponent(linkLimpio);
    
    console.log("🔗 URL codificada:", codificado);

    try {

       
        console.log("URL llamada:", `http://127.0.0.1:8000/Resumen/?link=${codificado}`);
        const response = await fetch(`http://127.0.0.1:8000/Resumen/?link=${codificado}`);
         
        if (!response.ok) {
            throw new Error("Error en la llamada: " + response.status);
        }

        const data = await response.json();

        GuardarRespuesta(data.mensaje);
        
        console.log("✅ Resumen guardado:", data.mensaje);
    }
    catch(error){
        console.error("Error: ", error);
        Resumen("Ocurrio un error al enviar a la api")
    }
    
}

function GuardarRespuesta(texto){
    localStorage.setItem('resumenIA', texto);
}

export async function RespuestaDoc(archivo) {
    console.log("Archivo recibido");

    try{
        const response = await fetch(`http://127.0.0.1:8000/ResumenArchivo/`,{
            method: "POST",
            body: archivo
            });

        if (!response.ok){
            throw new Error("Error en la llamada: " + response.status);
        }

        const data = await response.json();

        GuardarRespuesta(data.mensaje);
    }
    catch(error){
        console.error("Error: ", error);
        Resumen("Ocurrio un error al enviar a la api")
    }
}


