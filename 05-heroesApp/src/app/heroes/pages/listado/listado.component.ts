import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      mat-card {
        margin-top: 25px;
      }
    `,
  ],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(private heroeService: HeroesService) {}

  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
