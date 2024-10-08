import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes';

@Pipe({
  name: 'imagen',
  // Se agrega pure para definir si el pipe se va a disparar cada vez que cambie.
  // pure: false,
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    if (!heroe.id && !heroe.alt_img) {
      return '/assets/no-image.png';
    } else if (heroe.alt_img) {
      return heroe.alt_img;
    } else {
      return `/assets/heroes/${heroe.id}.jpg`;
    }
  }
}
