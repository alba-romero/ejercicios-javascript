const contenidos = [
    new Map([
        ["id", 1],
        ["titulo", "Vídeo 1"],
        ["categoria", "Humor"],
        ["descripcion", "Este es un vídeo de humor."],
        ["imagen", "multimedia/imagen1.jpg"],
        ["video", "multimedia/video1.mp4"],
    ]),
    new Map([
        ["id", 2],
        ["titulo", "Vídeo 2"],
        ["categoria", "Cine"],
        ["descripcion", "Este es un vídeo de cine."],
        ["imagen", "multimedia/imagen2.jpg"],
        ["video", "multimedia/video2.mp4"],
    ]),
];

const enlaceInicio = document.getElementById("enlace-inicio");
const enlaceVideos = document.getElementById("enlace-videos");
const enlaceBusqueda = document.getElementById("enlace-busqueda");
const contenedor = document.getElementById("contenedor");
const cabecera = document.getElementById("cabecera");
const contenido = document.getElementById("contenido");

enlaceInicio.addEventListener("click", (e) => {
    e.preventDefault();
    cabecera.innerHTML = `<h1>${"Bienvenido al almacén de videos de Alba"}</h1>
    <p>${"Puedes navegar a través de la barra lateral"}</p>
    `;
    contenido.innerHTML = `
    <article>
    <h2>${"Panel de vídeos"}</h2>
    <p>${"Aquí puedes ver los vídeos disponibles y reproducirlos"}</p>
    </article>
    <article>
    <h2>${"Panel de búsqueda"}</h2>
    <p>${"Aquí puedes buscar los vídeos disponibles a través de un formulario"}</p>
    </article>
    `;
});

enlaceVideos.addEventListener("click", (e) => {
    e.preventDefault();
    cabecera.innerHTML = `<h1>${"Listado de vídeos"}</h1>`;
    contenido.innerHTML = "";
    contenidos.forEach((video) => {
        const id = video.get("id");
        const titulo = video.get("titulo");
        const categoria = video.get("categoria");
        const descripcion = video.get("descripcion");
        const imagen = video.get("imagen");
        const archivoVideo = video.get("video");

        contenido.innerHTML += `
        
        <article>
        <h2>${titulo}</h2>

        <img src="${imagen}" alt = "${titulo}">
        <p><strong>Categoría:</strong> ${categoria}</p>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <p><strong>Vídeo:</strong>${archivoVideo}</p>
        <a href="#" class="reproducir" data-id="${id}">Reproducir</a>
        </article>
        `;
    });
    activarEnlacesReproducir();
});

enlaceBusqueda.addEventListener("click", (e) => {
    e.preventDefault();
    cabecera.innerHTML = `<h1>${"Búsqueda de vídeos"}</h1>`;

    contenido.innerHTML = `
    <form id="formulario-busqueda">
    <label for="titulo">Título</label>
    <input type="text" id="titulo" name="titulo">
    <label for="categoria">Categoría</label>
    <select id="categoria"  name="categoria">
    <option value="">Todas</option>
    <option value="Humor">Humor</option>
    <option value="Cine">Cine</option>
    </select>
    <button type="submit">Buscar</button>
    </form>
    <div id="resultados-busqueda"></div>

    `;
    const formulario = document.getElementById("formulario-busqueda");
    const resultados = document.getElementById("resultados-busqueda");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        resultados.innerHTML = "";
        let encontrados = false;
        const tituloBuscado = document.getElementById("titulo").value.toLowerCase();
        const categoriaBuscada = document.getElementById("categoria").value.toLowerCase();
        if (tituloBuscado.trim() === "") {
            alert("El campo de búsqueda está vacío");
            return;
        }
        contenidos.forEach((video) => {
            const titulo = video.get("titulo");
            const categoria = video.get("categoria");
            const coincideTitulo = titulo.toLowerCase().includes(tituloBuscado);
            const coincideCategoria =
                categoriaBuscada === "" || categoria === categoriaBuscada;
            if (coincideTitulo && coincideCategoria) {
                encontrados = true;
                const id = video.get("id");
                const descripcion = video.get("descripcion");
                const imagen = video.get("imagen");
                const archivoVideo = video.get("video");

                resultados.innerHTML += `
        
        <article>
        <h2>${titulo}</h2>

        <img src="${imagen}" alt = "${titulo}">
        <p><strong>Categoría:</strong> ${categoria}</p>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <p><strong>Vídeo:</strong>${archivoVideo}</p>
        <a href="#" class="reproducir" data-id="${id}">Reproducir</a>
        </article>
        `;
            }
        });
        activarEnlacesReproducir();
        if (!encontrados)
            resultados.innerHTML = `<p>No se han encontrado vídeos que coincidan con la búsqueda</p>`;
    });
});

function reproducirVideo(id) {
    const video = contenidos.find((video) => video.get("id") === id);
    const titulo = video.get("titulo");
    const imagen = video.get("imagen");
    const archivoVideo = video.get("video");
    cabecera.innerHTML = `
    <h1>Reproducción ${titulo}</h1>
    `;
    contenido.innerHTML = `
    <div class="reproductor">
    <video id="video" controls width="600" poster="${imagen}">
    <source src="${archivoVideo}" type="video/mp4">
    Tu navegador no soporta la reproducción de vídeo.
    </video>

    <div class="controles-video">
    <button id="reproducir">Reproducir</button>
    <button id="pausar">Pausar</button>
    <button id="inicio">Volver al inicio</button>
    </div>
    </div>
    
    `;
    const reproductor = document.getElementById("video");
    const botonReproducir = document.getElementById("reproducir");
    const botonPausar = document.getElementById("pausar");
    const botonInicio = document.getElementById("inicio");
    botonReproducir.addEventListener("click", () => {
        reproductor.play();
    });
    botonPausar.addEventListener("click", () => {
        reproductor.pause();
    });
    botonInicio.addEventListener("click", () => {
        reproductor.currentTime = 0;
    });
}

function activarEnlacesReproducir() {
    const enlacesReproducir = document.querySelectorAll(".reproducir");
    enlacesReproducir.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();
            const id = Number(enlace.dataset.id);
            reproducirVideo(id);
        });
    });
}
