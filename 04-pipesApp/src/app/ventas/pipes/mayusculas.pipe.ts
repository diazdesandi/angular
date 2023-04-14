import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayusculas',
})
export class MayusculasPipe implements PipeTransform {
  transform(valor: string, n: boolean = true): string {
    // console.log(valor);
    // if (n === true) {
    //   return valor.toUpperCase();
    // } else {
    //   return valor.toLowerCase();
    // }
    return n ? valor.toUpperCase() : valor.toLowerCase();
  }
}
