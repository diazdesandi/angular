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

console.log("El volumen actual de: ", volumen);
console.log("El segundo actual de: ", segundo);
console.log("La cancion actual de: ", cancion);
console.log("El autor es: ", autor);
