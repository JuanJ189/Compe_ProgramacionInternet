import {PedirRespuesta, RespuestaDoc} from "./ConexionLink.js"

const formulario_link = document.getElementById("ConsultaLink");
const formulario_doc = document.getElementById("ConsultaDoc");

formulario_link.addEventListener("submit", async function(evento){
  evento.preventDefault();
  

  const link = document.getElementById("ConsultaLink-link").value;

  try{

    await PedirRespuesta(link);
    
    console.error("Lego aqui");
    VistaChat();
  }
  catch(error){
    console.log(error);
    console.log("Ocurrio un error en Validacion.js ");
  }
  
  
  
});

formulario_doc.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const input = document.getElementById("ConsultaDoc-doc");
  const archivo = new FormData();

  

  if (!input.files.length) {
    console.log("No se seleccionó ningún archivo");
    return;
  }
  
  archivo.append("file", input.files[0]);
  try{
    await RespuestaDoc(archivo);

    VistaChat();
  }
  catch(error){
    console.error(error);
    console.log("Ocurrio un error en validacion.js")
  }
});



function VistaChat(){
  window.location.href = "/FrontEnd/Chat.html";
}

