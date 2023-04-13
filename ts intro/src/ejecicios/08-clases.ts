/*
    ===== Código de TypeScript =====
*/

// Clases TS

// class Heroe {
//   alterEgo: string;
//   edad: number;
//   nombreReal: number;

//   constructor(alterEgo: string, edad: number) {
//     this.alterEgo = alterEgo;
//     this.edad = edad;
//   }
// }

class PersonaNormal {
  constructor(public nombre: string, public direccion: string) {}
}

// Mejor:
class Heroe extends PersonaNormal {
  constructor(
    public alterEgo: string,
    public edad: number,
    public nombreReal: string
  ) {
    super(nombreReal, "New York, USA");
  }
}

const ironman = new Heroe("Ironman", 45, "Tony");

console.log(ironman);
