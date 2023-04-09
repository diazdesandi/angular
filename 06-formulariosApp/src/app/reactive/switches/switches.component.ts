import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
})
export class SwitchesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: ['M', Validators.required],
    terminos: [false, Validators.requiredTrue],
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.miFormulario.reset({
      ...this.persona,
      condicones: false,
    });

    // this.miFormulario.get('condiciones')?.valueChanges.subscribe((newValue) => {
    //   console.log(newValue);
    // });

    this.miFormulario.valueChanges.subscribe((form) => {
      delete form.terminos;
      this.persona = form;
    });
    // Alternativa
    // this.miFormulario.valueChanges.subscribe(({ terminos, ...rest }) => {
    //   this.persona = rest;
    // });
  }

  guardar() {
    const formValue = { ...this.miFormulario.value };

    delete formValue.terminos;

    // console.log(formValue);

    this.persona = formValue;
  }
}
