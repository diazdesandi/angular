import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { map } from 'rxjs';

interface MarcadorColor {
  color: string;
  marcador?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999;
      }
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarcadoresComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-117.02104841979578, 32.52056435087483];

  // Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  constructor() {}

  ngAfterViewChecked(): void {
    this.guardarMarcadores();
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.leerLocalStorage();

    // Marcadores hard-coded
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola mundo';

    // const maker = new mapboxgl.Marker({ element: markerHtml })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }

  agregarMarcador() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    // tenerlo como const agrega referencia directa al objeto
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true, // Mover marcador
      color: color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({ color: color, marcador: nuevoMarcador });

    // console.log(this.marcadores);

    this.guardarMarcadores();

    // Para que se guarde cuando se mueva el marcador
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadores();
    });
  }

  irMarcador(marker: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker.getLngLat(),
    });
  }

  guardarMarcadores() {
    const lngLatArr: MarcadorColor[] = [];
    this.marcadores.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marcador!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat],
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );

    console.log(lngLatArr);

    lngLatArr.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marcador: newMarker,
        color: m.color,
      });

      // Para que se guarde cuando se mueva el marcador
      newMarker.on('dragend', () => {
        this.guardarMarcadores();
      });
    });
  }

  borrarMarcador(i: number) {
    this.marcadores[i].marcador?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadores();
  }
}
