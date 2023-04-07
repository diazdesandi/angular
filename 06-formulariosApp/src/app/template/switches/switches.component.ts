import { Component } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
})
export class SwitchesComponent {
  persona = {
    genero: 'f',
    notificaciones: true,
  };

  terminosCondiciones: boolean = false;
}
