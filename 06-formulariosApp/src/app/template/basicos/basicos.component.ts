import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
})
export class BasicosComponent implements OnInit {
  // Para ver el elemento de una referencia local
  @ViewChild('miFormulario') miFormulario!: NgForm;

  // Para establecer valores en el formulario al cargar, utilizando ngModel
  initForm = {
    producto: '',
    precio: 0,
    inventario: 0,
  };

  constructor() {}

  ngOnInit(): void {}

  nombreValido(): boolean {
    return (
      this.miFormulario?.controls['producto']?.invalid &&
      this.miFormulario?.controls['producto']?.touched
    );
  }
  precioValido(): boolean {
    return (
      this.miFormulario?.controls['precio']?.value < 0 &&
      this.miFormulario?.controls['precio']?.touched
    );
  }

  guardar() {
    // console.log(this.miFormulario);
    console.log('Guardado');
    this.miFormulario.resetForm({
      precio: 0,
      inventario: 0,
    });
  }
}
