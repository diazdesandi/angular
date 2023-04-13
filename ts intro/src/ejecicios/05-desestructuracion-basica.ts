/*
    ===== Código de TypeScript =====
*/

import { StringLiteral } from "typescript";

interface Reproductor {
  volumen: number;
  segundo: number;
  cancion: string;
  detalles: Detalles;
}

interface Detalles {
  autor: string;
  anio: number;
}

const reproductor: Reproductor = {
  volumen: 90,
  segundo: 36,
  cancion: "Mess",
  detalles: {
    autor: "Ed Sheeran",
    anio: 2015,
  },
};

// Desestructurando todo dentro de una sola línea.
const {
  volumen,
  segundo,
  cancion,
  detalles: { autor },
} = reproductor;

// Otra altertaniva (mas legible)
// const { autor } = detalles;

/*
console.log("El volumen actual de: ", volumen);
console.log("El segundo actual de: ", segundo);
console.log("La cancion actual de: ", cancion);
console.log("El autor es: ", autor);
*/

// Desestructuración de arreglos.
const dbz: string[] = ["Goku", "Vegeta", "Trunks"];
// const [p1, p2, p3] = dbz;
// Para solo obtener una posición
const [, , p3] = dbz;

// console.log("Personaje 1:", p1);
// console.log("Personaje 2:", p2);
console.log("Personaje 3:", p3);
