import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from 'src/app/auth/interface/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent {
  get auth() {
    return this.authService.auth;
  }

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.router.navigate(['./auth']);
  }
}
