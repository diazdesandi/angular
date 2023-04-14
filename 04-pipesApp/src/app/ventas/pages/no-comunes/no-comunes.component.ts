import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
})
export class NoComunesComponent {
  nombre: string = 'Fernando';
  genero: string = 'masculino';

  // i18nSelect pipe elige entre una serie de opciones,
  // segun el argumento que se este enviando.
  invitacionMap = {
    masculino: 'invitarlo',
    femenino: 'invitarla',
  };

  cambiarCliente() {
    this.nombre = 'Susana';
    this.genero = 'femenino';
    console.log(this.nombre);
    console.log(this.genero);
  }

  // i18nPlural
  clientes: string[] = [
    'Maria',
    'Pedro',
    'Juan',
    'Hernando',
    'Fernando',
    'Eduardo',
  ];

  clientesMap = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    other: 'tenemos # clientes esperando',
  };

  borrarCliente() {
    this.clientes.pop();
    console.log(this.clientes);
  }

  // KeyValue Pipe
  persona = {
    nombre: 'Fernando',
    edad: 35,
    direccion: 'Ottawa,Canadá',
  };

  // JSON Pipe
  heroes = [
    { nombre: 'Superman', vuela: true },
    { nombre: 'Robin', vuela: false },
    { nombre: 'Aquaman', vuela: false },
  ];

  // Async Pipe
  miObs = interval(2000);
  valProm = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise data');
    }, 3500);
  });
}
