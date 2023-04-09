import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
})
export class DinamicosComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required],
      ],
      Validators.required
    ),
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  // miFormulario: FormGroup = this.fb.group({
  //   nombre: ['', [Validators.required, Validators.minLength(3)]],
  //   favoritos: this.fb.array(
  //     [
  //       ['Metal Gear', Validators.required],
  //       ['Death Stranding', Validators.required],
  //     ],
  //     Validators.required
  //   ),
  // });

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  // Se puede realizar un servicio donde se lleven a cabo las validaciones
  campoValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) return;

    /*
    this.favoritosArr.push(
      new FormControl(this.nuevoFavorito.value, Validators.required)
    );
    */
    this.favoritosArr.push(
      this.fb.control(this.nuevoFavorito.value, Validators.required)
    );

    this.nuevoFavorito.reset();
  }

  borrar(index: number) {
    this.favoritosArr.removeAt(index);
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
