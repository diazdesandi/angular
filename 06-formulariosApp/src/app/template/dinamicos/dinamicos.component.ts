import { Component, OnInit } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
})
export class DinamicosComponent {
  nuevoJuego = '';

  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      {
        id: 1,
        nombre: 'Metal Gear',
      },
      {
        id: 2,
        nombre: 'Death Stranding',
      },
    ],
  };

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

  agregar() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego,
    };
    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }

  guardar() {
    console.log('formulario posteado');
  }
}
