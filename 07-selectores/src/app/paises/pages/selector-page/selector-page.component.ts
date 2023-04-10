import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/pais-service.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // Llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit() {
    this.regiones = this.paisesService.regiones;

    // Cuando cambie la región
    /*
    this.miFormulario.get('region')?.valueChanges.subscribe((region) => {
      console.log(region);
      this.paisesService.getId(region).subscribe((paises) => {
        console.log(paises);
        this.paises = paises;
      });
    });
    */

    // Usando RxJS
    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap((region) => this.paisesService.getId(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
      });
    // Cuando cambia el pais
    this.miFormulario.get('pais')?.valueChanges.subscribe((codigo) => {
      console.log(codigo);
    });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
