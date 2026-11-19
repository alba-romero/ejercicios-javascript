async function cargarJSON() {
  try {
    const respuesta = await fetch('noticias.json');
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }
    const datos = await respuesta.json(); 
    return datos;
  } catch (error) {
    console.error('No se pudo cargar el JSON:', error);
  }
}

// EJERCICIO 1
const espacioTitulo = document.getElementById("espacioTitulo");

async function intervalo() {
  const datos = await cargarJSON();
  if (!datos) return;
  let indice = 0;
  let intervalo1 = setInterval(() => {
    espacioTitulo.textContent = datos[indice].titulo;
    indice++;
    if (indice === datos.length) indice = 0;
  }, 2000); 
}

intervalo();



// EJERCICIO 2
const enlacePortada = document.getElementById("enlacePortada");
const seccionNoticias = document.getElementById("noticias");
enlacePortada.addEventListener("click", (e)=>{
e.preventDefault();
recomponerHTML();
seccionNoticias.innerHTML = ``;
portadaNoticias();
});

async function portadaNoticias(){
    let indice = 0;
    const datos = await cargarJSON();
    while(indice !== datos.length){
    seccionNoticias.innerHTML += `
    <article>
                <h2>${datos[indice].titulo}</h2>
                <p class="meta">${datos[indice].fechaPublicacion}</p>
                <p>
                    ${datos[indice].resumen}
                </p>
                <div>
                <img src="imagenes/${datos[indice].imagen}">
                </div>
            </article>
    
    `;
indice++;
    }
}

// EJERCICIO 3
const enlaceCategoria = document.getElementById("enlaceCategoría");
const espacioCategoria = document.getElementById("espacioCategoria");

enlaceCategoria.addEventListener("click", async (e) => {
    e.preventDefault();
    recomponerHTML();
    espacioCategoria.innerHTML = "";

    await seccionCategorias();
});

async function seccionCategorias() {
    const datos = await cargarJSON();
    let html = `
        <label for="opciones">Elige una categoría:</label>
        <select id="opciones" name="opciones">
    `;

    let indice = 0;

    while (indice !== datos.length) {
        html += `<option value=${datos[indice].categoria}>
                    ${datos[indice].categoria}
                 </option>`;
        indice++;
    }
    html += `</select>`;
    espacioCategoria.innerHTML = html;
}

// EJERCICIO 4


espacioCategoria.addEventListener("change", (e)=>{
   const categoriaSeleccionada = e.target.value;
   noticiasCategoria(categoriaSeleccionada)
});

async function noticiasCategoria(categoriaSeleccionada) {
    const datos = await cargarJSON();

    let indice = 0;
    let html = "";

    while (indice !== datos.length) {

        if (datos[indice].categoria === categoriaSeleccionada) {

            html += `
            <article>
                <h2>${datos[indice].titulo}</h2>
                <p class="meta">${datos[indice].fechaPublicacion}</p>
                <p>${datos[indice].resumen}</p>
                <div>
                    <img src="imagenes/${datos[indice].imagen}">
                </div>
            </article>
            `;
        }

        indice++;
    }

    seccionNoticias.innerHTML = html;
}


//EJERCICIO 5

const enlaceGrafico = document.getElementById("enlaceGrafico");
enlaceGrafico.addEventListener("click", async (e)=>{
  e.preventDefault();
  recomponerHTML();
 await crearGrafico();
});
  let graficos = [];

async function crearGrafico() {

  if(graficos[1]) graficos[1].destroy();
    const datos = await cargarJSON();

    graficos[1] = new Chart(document.getElementById('grafico1'), {
        type: 'bar',
        data: {
            labels: datos.map(noticia => noticia.id),
            datasets: [{
                label: 'Votos por noticia',
                data: datos.map(noticia => noticia.votos),
                backgroundColor: '#61bed5',
                borderColor: '#333',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Votos de las noticias',
                    font: {
                        family: 'Georgia',
                        size: 18,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'right'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function recomponerHTML(){
seccionNoticias.innerHTML = `
<article>
                <h2>Titular de la noticia principal</h2>
                <p class="meta">Publicado el 15 de diciembre de 2025</p>
                <p>
                    Este es un breve resumen de la noticia principal.
                </p>
            </article>

            <article>
                <h2>Otra noticia destacada</h2>
                <p class="meta">Publicado el 14 de diciembre de 2025</p>
                <p>
                    Texto introductorio de otra noticia importante del día.
                </p>
            </article>
            <div id="contenedorGrafico">
                <canvas id="grafico1"></canvas>
                </div>


`;

espacioCategoria.innerHTML = `
<h3>Última hora</h3>
            <ul>
                <li><a href="#">Noticia urgente 1</a></li>
                <li><a href="#">Noticia urgente 2</a></li>
                <li><a href="#">Noticia urgente 3</a></li>
            </ul>

`;
}