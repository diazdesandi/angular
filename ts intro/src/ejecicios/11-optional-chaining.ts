/*
    ===== Código de TypeScript =====
*/
// Encadenamiento opcional

interface Pasajero {
  nombre: string;
  hijos?: string[];
}

const pasajero1: Pasajero = {
  nombre: "Fernando",
};

const pasajero2: Pasajero = {
  nombre: "Melissa",
  hijos: ["Natalia", "Gabriel"],
};

function imprimeHijos(pasajero: Pasajero): void {
  // Secure operator, evalua si tiene hijos continua, si no es nada regresa 0.
  const cuantosHijos = pasajero.hijos?.length || 0;

  console.log(cuantosHijos);
}

imprimeHijos(pasajero1);
