/*
    ===== Código de TypeScript =====
*/

function sumar(a: number, b: number) {
  return a + b;
}

const sumarFlecha = (a: number, b: number) => {
  return a + b;
};

// Primero argumentos, despues opcionales, despues constantes (si no se envia se utiliza el numero predeterminado)
function multiplicar(
  numero: number,
  otroNumero?: number,
  base: number = 2
): number {
  return numero * base;
}

// const resultado = sumar(10, 20);
// const resultado = multiplicar(5);

// console.log(resultado);

interface PersonajeLOR {
  nombre: string;
  pv: number;
  mostrarHp: () => void;
}

function curar(personaje: PersonajeLOR, curarX: number): void {
  personaje.pv += curarX;

  console.log(personaje);
}

const nuevoPersonaje: PersonajeLOR = {
  nombre: "Strider",
  pv: 50,
  mostrarHp() {
    console.log("Puntos de vida:", this.pv);
  },
};

curar(nuevoPersonaje, 20);

nuevoPersonaje.mostrarHp();
