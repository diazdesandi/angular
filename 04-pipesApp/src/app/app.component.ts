import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pipesApp';

  nombre: string = 'fernando herrErA';
  valor: number = 1000;

  mostrarNombre() {
    console.log(this.nombre);
    console.log(this.valor);
  }
}
