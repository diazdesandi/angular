import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
})
export class BasicosComponent {
  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080Ti'),
  //   precio: new FormControl(1500),
  //   inventario: new FormControl(5),
  // });

  constructor(private fb: FormBuilder) {}

  miFormulario: FormGroup = this.fb.group({
    nombre: ['RTX 4080Ti'],
    precio: [1500],
    inventario: [5],
  });
}
