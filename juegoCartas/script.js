/* El juego de las cartas oficial del IES Inca Garcilaso

Para jugar a este juego necesitamos cinco jugadores

Jugamos con una baraja de 25 cartas. 
En la baraja hay las siguientes figuras. Las categorías están ordenadas desde la más valiosa hasta la de menor valor:
	
	* 5 cartas tipo "Inca"  Vale 10 puntos
	* 5 cartas tipo "SuperProgramadores" vale 5 puntos
	* 5 cartas tipo "Expertos"	vale 3 puntos
	* 5 cartas tipo "Junior"	vale 2 puntos
	* 5 cartas tipo "Novato"	vale 1 punto


A cada jugador se le va a repartir un total de 5 cartas. 

(implementar las cartas de cada jugador con un mapa, con el siguiente par clave-valor (carta1, "tipo de carta")

Gana aquel jugador cuyas cartas sumen más puntos
Debéis mostrar las cartas de cada jugador y el jugador que ha ganado la partida*/

let cartas = new Map([
    ["Inca", 10],
    ["SuperProgramadores", 5],
    ["Expertos", 3],
    ["Junior", 2],
    ["Novato", 1]
]);

let jugadores = new Map([
    ["Jugador 1", []],
    ["Jugador 2", []],
    ["Jugador 3", []],
    ["Jugador 4", []],
    ["Jugador 5", []]
]);

let baraja = [];

for (let [tipo, puntos] of cartas) {
    for (let i = 0; i < 5; i++) {
        baraja.push(tipo);
    }
}

function repartirCartas() {
    for (let [jugador, mano] of jugadores) {
        for (let i = 0; i < 5; i++) {
            let indice = Math.floor(Math.random() * baraja.length);

            mano.push(baraja[indice]);

            baraja.splice(indice, 1);
        }
    }
}

function calcularPuntos() {
    let puntosJugadores = new Map();

    for (let [jugador, mano] of jugadores) {
        let puntos = 0;

        for (let carta of mano) {
            puntos += cartas.get(carta);
        }

        puntosJugadores.set(jugador, puntos);
    }

    return puntosJugadores;
}

function jugar() {
    repartirCartas();

    let puntosJugadores = calcularPuntos();

    let ganador = "";
    let maxPuntos = 0;

    for (let [jugador, mano] of jugadores) {
        console.log(jugador + ":");
        console.log("Cartas: " + mano.join(", "));
        console.log("Puntos: " + puntosJugadores.get(jugador));

        if (puntosJugadores.get(jugador) > maxPuntos) {
            maxPuntos = puntosJugadores.get(jugador);
            ganador = jugador;
        }
    }

    console.log("¡Ha ganado " + ganador + " con " + maxPuntos + " puntos!");
}

jugar();