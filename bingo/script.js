function bingo(){
    let j1 = new Set();
    let j2 = new Set();
   while(j1.size < 10){
       j1.add(Math.floor(Math.random() * 50) + 1);
   }
   while(j2.size < 10){
       j2.add(Math.floor(Math.random() * 50) + 1);
   }
   console.log("Bingo del Jugador 1: " + Array.from(j1).join(", "));
   console.log("Bingo del Jugador 2: " + Array.from(j2).join(", "));
   let numerosAparecidos = new Set();
   while(j1.size > 0 && j2.size > 0){
    let numero = Math.floor(Math.random() * 50) + 1;
    if(!numerosAparecidos.has(numero)){
    numerosAparecidos.add(numero);
    j1.delete(numero);
    j2.delete(numero);
    console.log("Números aparecidos: " + Array.from(numerosAparecidos).join(", "));
    console.log("Bingo del Jugador 1: " + Array.from(j1).join(", "));
    console.log("Bingo del Jugador 2: " + Array.from(j2).join(", "));

   }
}
   if(j1.size === 0) console.log("¡El Jugador 1 ha ganado!");
   else console.log("¡El Jugador 2 ha ganado!");
    
}
bingo();
