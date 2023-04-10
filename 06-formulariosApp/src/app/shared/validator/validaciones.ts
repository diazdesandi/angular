import { FormControl } from '@angular/forms';

export const nombreApellidoPatern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

// Conversión de metodo a función.
/*
noPuedeSerStrider(control: FormControl) {
    const valor: string = control.value?.trim().toLowerCase();
    console.log(valor);
    if (valor === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
}
*/

export const noPuedeSerStrider = (control: FormControl) => {
  const valor: string = control.value?.trim().toLowerCase();
  console.log(valor);
  if (valor === 'strider') {
    return {
      noStrider: true,
    };
  }
  return null;
};
