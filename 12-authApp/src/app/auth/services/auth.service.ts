import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';
import { catchError, map } from 'rxjs/operators';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario }; // Desestructuración
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/`;
    const body = { email, password };
    // Regresa el observable (regresa objeto)
    return this.http.post<AuthResponse>(url, body).pipe(
      // Orden de operadores de rxjs es en cascaad
      tap((resp) => {
        if (resp.ok) {
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
          };
        }
      }),
      // Obtiene true o false (ok: true | false)
      map((resp) => resp.ok),
      // Captura el error y lo convierte en observable
      catchError((err) => of(false))
    );
  }
}
