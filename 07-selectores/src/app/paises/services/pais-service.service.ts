import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais, PaisSmall } from '../interfaces/paises.interface';
import { Observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private baseUrl: string = 'https://restcountries.com/v3.1/';
  // Privado para prevenir modificaciones
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    // Se regresa el arreglo desestructurado para evitar manipulaciones
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getId(region: string): Observable<PaisSmall[]> {
    const url: string = `${this.baseUrl}/region/${region}?fields=name,cca3`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisId(codigo: string): Observable<Pais | null> {
    if (!codigo) {
      return of(null);
    }
    const url = `${this.baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais>(url);
  }

  getPaisPorCodigoSmall(codigo: string): Observable<PaisSmall> {
    const url = `${this.baseUrl}/alpha/${codigo}?fields=name,cca3`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach((codigo) => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
