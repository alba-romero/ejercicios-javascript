const cantidad = document.getElementById("cantidad");
const boton = document.getElementById("boton");
const contenedor = document.getElementById("contenedor-cartas");
const elementoTiempo = document.getElementById("tiempo");

let primeraTarjeta = null;
let segundaTarjeta = null;
let bloqueado = false;
let parejasTotales = 0;
let parejasEncontradas = 0;
let segundos = 0;
let intervaloReloj = null;
let juegoIniciado = false;

function generarTarjetas(cantidad) {
  contenedor.innerHTML = "";
  clearInterval(intervaloReloj);
  primeraTarjeta = null;
  segundaTarjeta = null;
  bloqueado = false;
  parejasTotales = parseInt(cantidad);
  parejasEncontradas = 0;
  segundos = 0;
  if (elementoTiempo) elementoTiempo.textContent = "Tiempo: 0s";
  contenedor.innerHTML = "";
  const arrayImg = [
    "./img/león.jpg",
    "./img/gato.jpg",
    "./img/perro.jpg",
    "./img/pez.jpg",
    "./img/tortuga.jpg",
    "./img/gallina.jpg",
    "./img/elefante.jpg",
    "./img/delfín.jpg",
    "./img/oso.jpg",
    "./img/cebra.jpg",
    "./img/búho.jpg",
    "./img/mariposa.jpg",
    "./img/cangrejo.jpg",
    "./img/cocodrilo.jpg",
    "./img/canguro.jpg",
    "./img/tiburón.jpg",
    "./img/tigre.jpg",
    "./img/jirafa.jpg",
    "./img/rana.jpg",
    "./img/pato.jpg",
  ];
  const imagenesSeleccionadas = arrayImg.slice(0, parejasTotales);
  const barajaFinal = [...imagenesSeleccionadas, ...imagenesSeleccionadas];
  for (let i = barajaFinal.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [barajaFinal[i], barajaFinal[j]] = [barajaFinal[j], barajaFinal[i]];
  }

  for (let i = 0; i < barajaFinal.length; i++) {
    const tarjeta = document.createElement("div");
    contenedor.appendChild(tarjeta);
    tarjeta.classList.add("tarjeta");
    const imagenReverso = document.createElement("img");
    imagenReverso.src = "./img/tarjeta-reverso-juego.png";
    tarjeta.appendChild(imagenReverso);
    const imagenFrontal = document.createElement("img");
    imagenFrontal.style.display = "none";
    tarjeta.appendChild(imagenFrontal);
    imagenFrontal.classList.add("imagenFrontal");
    imagenFrontal.src = barajaFinal[i];

    tarjeta.addEventListener("click", () => {
      if (bloqueado) return;
      if (imagenFrontal.style.display === "block") return;
      if (!juegoIniciado) {
        juegoIniciado = true;
        intervaloReloj = setInterval(() => {
          segundos++;
          if (elementoTiempo)
            elementoTiempo.textContent = `Tiempo: ${segundos}s`;
        }, 1000);
      }
      imagenReverso.style.display = "none";
      imagenFrontal.style.display = "block";
      if (!primeraTarjeta)
        primeraTarjeta = {
          tarjeta,
          reverso: imagenReverso,
          frontal: imagenFrontal,
        };
      else
        segundaTarjeta = {
          tarjeta,
          reverso: imagenReverso,
          frontal: imagenFrontal,
        };
      if (primeraTarjeta.frontal.src === segundaTarjeta.frontal.src) {
        parejasEncontradas++;
        if (parejasEncontradas === parejasTotales) {
          clearInterval(intervaloReloj);
          setTimeout(() => {
            alert(`Has ganado el juego en ${segundos} segundos`);
          }, 200);
        }
        primeraTarjeta = null;
        segundaTarjeta = null;
      } else {
        bloqueado = true;
        setTimeout(() => {
          primeraTarjeta.frontal.style.display = "none";
          primeraTarjeta.reverso.style.display = "block";
          segundaTarjeta.frontal.style.display = "none";
          segundaTarjeta.reverso.style.display = "block";
          primeraTarjeta = null;
          segundaTarjeta = null;
          bloqueado = false;
        }, 1000);
      }
    });
  }
}

boton.addEventListener("click", () => {
  generarTarjetas(cantidad.value);
});
