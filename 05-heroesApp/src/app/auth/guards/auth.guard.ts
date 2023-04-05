import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('Bloqueado por CanActivate');
    // return this.authService.auth.id ? true : false;
    return this.authService.verificarAuth().pipe(
      tap((autenticado) => {
        if (!autenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.auth.id) {
    //   return true;
    // } else {
    //   console.log('Bloqueado por auth guard');
    //   return false;
    // }
    // console.log('Bloqueado por CanLoad');
    // return this.authService.auth.id ? true : false;

    return this.authService.verificarAuth().pipe(
      tap((autenticado) => {
        if (!autenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
}
