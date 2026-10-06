const input1 = document.getElementById("input1");
const botonEnviar = document.getElementById("enviar");
const botonBorrar =  document.getElementById("borrar");
const input2 = document.getElementById("input2");
const inputs = document.getElementById("inputs");
const enlace = document.getElementById("enlace");
const imagen = document.getElementById("imagen");
imagen.hidden = true;
input2.hidden = true;
botonEnviar.addEventListener('click', ()=>{
  if(input1.value == "") alert("No se puede enviar");
    else{
        alert("Se puede enviar");
        input1.value="";
    }
});

botonBorrar.addEventListener('click', ()=>{
inputs.innerHTML="";
});

input1.addEventListener('keydown', ()=>{
    input2.hidden = false;
});

input1.addEventListener('keyup', ()=>{
    input2.hidden = true;
});

enlace.addEventListener('click', ()=>{
  imagen.hidden = false;
});

botonEnviar.addEventListener('mouseenter', ()=>{
    botonEnviar.style.backgroundColor = 'yellow';
});

botonBorrar.addEventListener('mouseenter', ()=>{
    botonBorrar.style.backgroundColor = 'yellow';
});

botonEnviar.addEventListener('mouseleave', ()=>{
    botonEnviar.style.backgroundColor = '';
});

botonBorrar.addEventListener('mouseleave', ()=>{
    botonBorrar.style.backgroundColor = '';
});
