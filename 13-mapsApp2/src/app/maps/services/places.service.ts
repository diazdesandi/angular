import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number];

  get isUserLocationReady(): boolean {
    // 1era negación: indica que no tiene valor
    // 2da  negación: negación de que no existe (true)
    return !!this.useLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (error) => {
          console.log(error), alert('No se pudo obtener la ubicación');
        }
      );
    });
  }
}
