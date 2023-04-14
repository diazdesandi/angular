import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/pais-service.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required], // { value: '', disabled: true } en lugar de '' para validar
  });

  // Llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  // fronteras: string[]    = []
  fronteras: PaisSmall[] = [];

  // UI
  cargando: boolean = false;

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
    // Cuando cambia la region
    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
          // this.miFormulario.get('frontera')?.disable();
        }),
        switchMap((region) => this.paisesService.getId(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.cargando = false;
      });
    // Cuando cambia el pais
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
          // this.miFormulario.get('frontera')?.enable();
        }),
        switchMap((codigo) => this.paisesService.getPaisId(codigo)),
        switchMap((pais) =>
          this.paisesService.getPaisesPorCodigos(pais?.borders!)
        )
      )
      .subscribe((paises) => {
        // this.fronteras = pais?.borders || [];
        this.fronteras = paises;
        this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
