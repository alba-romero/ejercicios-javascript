/*Tenemos un sistema de cuatro jugadores

Cada jugador debes implementarlo con un mapa. La clave será el numero de jugador (jugadorX) y el valor la puntuación

Si algún jugador llega a la puntuación de 10, ha ganado el juego

Como se juega
- En cada tirada se genera un número aleatorio entre 1 y 6 para cada jugador
- El número más alto gana y suma un punto en su contador personal
- Si hay dos números más altos iguales, se repite la tirada

Por cada tirada, debe mostrarse los números generados de cada jugador, si la jugada se repite o no (al haber más de un ganador), el ganador de la jugada y la puntuación de cada jugador

Cuando finalice el juego se debe mostrar la puntuación de cada jugador y el ganador.*/

let jugadores = new Map([
    ["Jugador 1", 0],
    ["Jugador 2", 0],
    ["Jugador 3", 0],
    ["Jugador 4", 0]
]);

function tiradaNumeros() {
    let tiradas = new Map();
    for (let jugador of jugadores.keys()) {
        let num = Math.floor(Math.random() * 6) + 1;
        tiradas.set(jugador, num);
    }

    return tiradas;
}
function definirGanador(tiradas) {
    let maxNumero = 0;
    let ganador = "";
    let contadorGanadores = 0;

    for (let [jugador, numero] of tiradas) {
        if (numero > maxNumero) {
            maxNumero = numero;
            ganador = jugador;
        }
    }

    for (let numero of tiradas.values()) {
        if (numero == maxNumero) {
            contadorGanadores++;
        }
    }

    if (contadorGanadores > 1) {
        return null;
    }

    return ganador;
}

function jugar() {

    while (![...jugadores.values()].includes(10)) {

        let tirada = tiradaNumeros();

        console.log("\n--- NUEVA TIRADA ---");

        for (let [jugador, numero] of tirada) {
            console.log(jugador + ": " + numero);
        }

        let ganador = definirGanador(tirada);

        if (ganador == null) {
            console.log("¡Ha habido un empate! Se repite la tirada.");
            continue;
        }

        jugadores.set(ganador, jugadores.get(ganador) + 1);

        console.log("¡Ha ganado " + ganador + "! Se suma un punto.");

        console.log("--- PUNTUACIONES ---");

        for (let [jugador, puntos] of jugadores) {
            console.log(jugador + ": " + puntos);
        }
    }

    console.log("\n--- PUNTUACIÓN FINAL ---");

    for (let [jugador, puntos] of jugadores) {
        console.log(jugador + ": " + puntos);
    }

    for (let [jugador, puntos] of jugadores) {
        if (puntos == 10) {
            console.log("¡El ganador del juego es " + jugador + "!");
            break;
        }
    }
}

jugar();