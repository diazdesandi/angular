import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent {
  heroes: string[] = [
    'Spiderman',
    'Ironman',
    'Hulk',
    'Thor',
    'Capitán América',
  ];
  heroeBorrado: string = '';

  borrarHeroe() {
    // Se establece que regrese un string vacío para
    // evitar que de el error de undefined.
    this.heroeBorrado = this.heroes.shift() || '';
  }
}
