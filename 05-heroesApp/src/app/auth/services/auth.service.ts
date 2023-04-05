import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interface/auth.interface';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.authUrl;
  private _auth: Auth | undefined;

  get auth() {
    // Desestructuración para evitar cambios
    return { ...this._auth };
  }

  constructor(private http: HttpClient) {}

  verificarAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    // return !localStorage.getItem('token') ? of(false) : of(true);

    return this.http.get<Auth>(`${this.url}/usuarios/1`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }

  login() {
    return this.http.get<Auth>(`${this.url}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }
  logout() {
    this._auth = undefined;
  }
}
