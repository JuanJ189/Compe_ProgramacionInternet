import {PedirRespuesta} from "./ConexionLink.js"

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


function VistaChat(){
  window.location.href = "/FrontEnd/Chat.html";
}

