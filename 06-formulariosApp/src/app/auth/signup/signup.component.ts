import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  // Temp
  nombreApellidoPatern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  miFormulario: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.pattern(this.nombreApellidoPatern)],
    ],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario.reset({ nombre: 'F R', email: 'test1@test.com' });
  }

  campoValidacion(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  submitForm() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }
}
