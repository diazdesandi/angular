import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe?: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(console.log);
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getByID(id)),
        tap(console.log) // Recibe el producto del observable e imprime en consola.
      )
      .subscribe((heroe) => {
        this.heroe = heroe;
      });
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
