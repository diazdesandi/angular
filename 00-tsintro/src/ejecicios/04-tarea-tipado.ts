/*
    ===== Código de TypeScript =====
*/

interface SuperHeroe {
  nombre: string;
  edad: number;
  direccion: Direccion;
  // Para una mejor legilibildad del codigo se pueden referenciar interfaces dentro de otras interfaces
  // direccion: {
  //   calle: string;
  //   ciudad: string;
  //   pais: string;
  // };
  mostrarDireccion: () => string;
}

interface Direccion {
  calle: string;
  ciudad: string;
  pais: string;
}

const superHeroe: SuperHeroe = {
  nombre: "Spiderman",
  edad: 30,
  direccion: {
    calle: "Main St",
    ciudad: "NY",
    pais: "USA",
  },
  mostrarDireccion() {
    return (
      this.nombre + ", " + this.direccion.ciudad + ", " + this.direccion.pais
    );
  },
};

const direccion = superHeroe.mostrarDireccion();
console.log(direccion);
