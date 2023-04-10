import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPatern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      usuario: [
        '',
        [Validators.required, this.validatorService.noPuedeSerStrider],
      ],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      contrasena2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('contrasena', 'contrasena2'),
      ],
    }
  );

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.['required']) {
      return 'Correo electrónico es obligatorio';
    } else if (errors?.['pattern']) {
      return 'Correo electrónico no es válido';
    } else if (errors?.['emailTomado']) {
      return 'Correo electrónico ya registrado';
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'F R',
      email: 'test1@test.com',
      usuario: 'userTest96',
      contrasena: 123456,
      contrasena2: 123456,
    });
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

