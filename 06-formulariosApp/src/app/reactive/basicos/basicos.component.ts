import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
})
export class BasicosComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Para establecer valor inicial.
    this.miFormulario.reset({
      nombre: 'RTX 4080Ti',
      precio: 1600,
      inventario: 10,
    });
  }
  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080Ti'),
  //   precio: new FormControl(1500),
  //   inventario: new FormControl(5),
  // });

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    inventario: [, [Validators.required, Validators.min(0)]],
  });

  campoValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
