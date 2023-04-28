import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, tap } from 'rxjs';

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

  // login(email: string, password: string) {
  //   const url = `${this.baseUrl}/auth/`;
  //   const body = { email, password };
  //   // Regresa el observable (regresa objeto)
  //   return this.http.post<AuthResponse>(url, body).pipe(
  //     // Orden de operadores de rxjs es en cascaad
  //     tap((resp) => {
  //       if (resp.ok) {
  //         localStorage.setItem('token', resp.token!);
  //       }
  //     }),
  //     // Obtiene true o false (ok: true | false)
  //     map((resp) => resp.ok),
  //     // Captura el error y lo convierte en observable
  //     catchError((err) => of(err.error.msg))
  //   );
  // }

  // signup(name: string, email: string, password: string) {
  //   const url = `${this.baseUrl}/auth/new`;
  //   const body = { name, email, password };
  //   return this.http.post<AuthResponse>(url, body).pipe(
  //     map((resp) => {
  //       if (resp.ok) {
  //         localStorage.setItem('token', resp.token!);
  //       }
  //       return resp.ok;
  //     }),
  //     catchError((err) => of(err.error.msg))
  //   );
  // }

  // validarToken(): Observable<boolean> {
  //   const url = `${this.baseUrl}/auth/renew`;
  //   const headers = new HttpHeaders().set(
  //     'x-token',
  //     localStorage.getItem('token') || ''
  //   );
  //   return this.http.get<AuthResponse>(url, { headers }).pipe(
  //     map((resp) => {
  //       // Lectura HTTP donde se verifica el token.
  //       console.log(resp.token);
  //       localStorage.setItem('token', resp.token!);
  //       if (resp.ok) {
  //         this._usuario = {
  //           name: resp.name!,
  //           uid: resp.uid!,
  //           email: resp.email!,
  //         };
  //       }
  //       return resp.ok;
  //     }),
  //     catchError((err) => of(false))
  //   );
  // }

  logout() {
    localStorage.clear();
  }
  /*
  Código optimizado
  */
  private manejarRespuesta(resp: AuthResponse) {
    if (resp.ok) {
      localStorage.setItem('token', resp.token!);
    }
    return resp.ok;
  }

  private manejarErrores(err: any) {
    return of(err.error.msg);
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => this.manejarRespuesta(resp)),
      map((resp) => resp.ok),
      catchError((err) => this.manejarErrores(err))
    );
  }

  signup(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      map((resp) => this.manejarRespuesta(resp)),
      catchError((err) => this.manejarErrores(err))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        // console.log(resp.token);
        localStorage.setItem('token', resp.token!);
        if (resp.ok) {
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!,
          };
        }
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }
}
