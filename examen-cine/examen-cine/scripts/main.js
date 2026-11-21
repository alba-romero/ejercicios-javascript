async function cargarJSON() {
  try {
    const respuesta = await fetch('peliculas.json');
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }
    const datos = await respuesta.json(); 
    return datos;
  } catch (error) {
    console.error('No se pudo cargar el JSON:', error);
  }
}

// EJERCICIO 1 (ir poniendo los títulos cada dos segundos)
const rotulo = document.getElementById("rotulo");

async function cambiarTitulos(){
    const datos = await cargarJSON();
    if (!datos) return;
    let indice = 0;
    let intervalo = setInterval(()=>{
rotulo.innerText = datos[indice].titulo;
indice++;
if(indice === datos.length) indice = 0;
    }, 2000);
}

cambiarTitulos();

// EJERCICIO 2 (OPCIÓN PELÍCULAS)

const enlacePeliculas = document.getElementById("enlace-peliculas");
const zonaIzq = document.getElementById("zona-izquierda");
const contenidoDerecha = document.getElementById("contenido-derecha");

async function posterPeliculas(){
    const datos = await cargarJSON();
    zonaIzq.innerHTML = ``;
   datos.forEach(dato => {
const contenedorPoster = document.createElement("div");
    const imagenPoster = document.createElement("img");
    const tituloPelicula = document.createElement("p");
        imagenPoster.src = dato.imagen;
        imagenPoster.className = "imagenPoster"
        contenedorPoster.appendChild(imagenPoster);
        tituloPelicula.textContent = dato.titulo;
        contenedorPoster.className = "tarjeta";
        contenedorPoster.appendChild(tituloPelicula);
        zonaIzq.appendChild(contenedorPoster);
        imagenPoster.addEventListener("click", async ()=>{
            await mostrarDatosPelicula(dato);
        })
   });
}

async function mostrarDatosPelicula(dato){
    const datos = await cargarJSON();
    contenidoDerecha.innerHTML = ``;
    let titulo = document.createElement("p");
    let genero = document.createElement("p");
    let duracion = document.createElement("p");
    let año = document.createElement("p");
    let director = document.createElement("p");
    let sinopsis = document.createElement("p");
    titulo.textContent = dato.titulo;
    genero.textContent = dato.genero;
    año.textContent = dato.anio;
    duracion.textContent = dato.duracion;
    director.textContent = dato.director;
    sinopsis.textContent = dato.sinopsis;
    contenidoDerecha.appendChild(titulo);
    contenidoDerecha.appendChild(genero);
    contenidoDerecha.appendChild(duracion);
    contenidoDerecha.appendChild(año);
    contenidoDerecha.appendChild(director);
    contenidoDerecha.appendChild(sinopsis);

}

enlacePeliculas.addEventListener("click", async (e)=>{
e.preventDefault();
await posterPeliculas()
});


// OPCIÓN GÉNEROS

const enlaceGeneros = document.getElementById("enlace-generos");

async function selectorGeneros(){
  const datos = await cargarJSON();
  contenidoDerecha.innerHTML = ``;
 let html = `
        <label for="opciones">Elige un género:</label>
        <select id="opciones" name="opciones">
    `;

    let indice = 0;

    while (indice !== datos.length) {
        html += `<option value=${datos[indice].genero}>
                    ${datos[indice].genero}
                 </option>`;
        indice++;
    }
    html += `</select>`;
  contenidoDerecha.innerHTML = html;

}

enlaceGeneros.addEventListener("click", async (e)=>{
e.preventDefault();
await selectorGeneros();
});

contenidoDerecha.addEventListener("change", (e)=>{
const generoSeleccionado = e.target.value;
posterPeliculasSegunGenero(generoSeleccionado);
});


async function posterPeliculasSegunGenero(generoSeleccionado){
    const datos = await cargarJSON();
    zonaIzq.innerHTML = ``;

   datos.forEach(dato => {
    if(dato.genero === generoSeleccionado ){
const contenedorPoster = document.createElement("div");
    const imagenPoster = document.createElement("img");
    const tituloPelicula = document.createElement("p");
        imagenPoster.src = dato.imagen;
        imagenPoster.className = "imagenPoster"
        contenedorPoster.appendChild(imagenPoster);
        tituloPelicula.textContent = dato.titulo;
        contenedorPoster.className = "tarjeta";
        contenedorPoster.appendChild(tituloPelicula);
        zonaIzq.appendChild(contenedorPoster);
        imagenPoster.addEventListener("click", async ()=>{
            await mostrarDatosPelicula(dato);
        })
    }

   });
}


const nuevoCanvas=document.createElement("canvas");
const segundoCanvas = document.createElement("canvas");
let grafico;
let grafico2;
// OPCIÓN ESTADÍSTICAS 
const enlaceEstadisticas = document.getElementById("enlace-estadisticas");
enlaceEstadisticas.addEventListener("click", async (e)=>{
  e.preventDefault();
  await graficoPorTitulo();
  await graficoDeNotasMedias();
})

async function graficoPorTitulo() {
     zonaIzq.innerHTML = ``;
    const datos= await cargarJSON();
    const selector=document.createElement("select");
    const ctx=nuevoCanvas.getContext("2d");
    zonaIzq.appendChild(selector);
    zonaIzq.appendChild(nuevoCanvas);
    
    datos.forEach((dato,indice)=>{
        const nuevoOption=document.createElement("option");
        nuevoOption.textContent=dato.titulo;
        nuevoOption.value=indice;
        selector.appendChild(nuevoOption);
      
    });
   selector.addEventListener("change", () => {
        const indiceSeleccionado = selector.value;
        const datoSeleccionado = datos[indiceSeleccionado];

        generarGrafico(datoSeleccionado, ctx);
    });
    generarGrafico(datos[0],ctx);
  }

  function generarGrafico(dato,ctx)
{
    if (grafico) {
        grafico.clear();
        grafico.destroy();
    }
  
    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Nota crítica', 'Nota público', 'Nota técnica'],
            datasets: [{
                label: 'Notas de '+dato.titulo,
                data: [dato.valoraciones.critica, dato.valoraciones.publico, dato.valoraciones.tecnica],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });
    grafico.update();
   
}

async function graficoDeNotasMedias()
{
    const datos= await cargarJSON();
    const titulos=datos.map(dato=>dato.titulo);
    const medias=datos.map(dato=>(dato.valoraciones.critica+dato.valoraciones.publico+dato.valoraciones.tecnica)/3);
    zonaIzq.appendChild(segundoCanvas);
    
    if (grafico2) {
        grafico2.clear();
        grafico2.destroy();
    }
    const ctx=segundoCanvas.getContext("2d");
    
    grafico2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: titulos,
            datasets: [{
                label: 'Notas de medias',
                data: medias,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });
    grafico.update();
}