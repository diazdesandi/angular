import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken =
  'pk.eyJ1IjoicmpkczExIiwiYSI6ImNsZ2U5NGR4bzBydjgzcnM5bTAxMGR6OXkifQ.4Yr5eOZuP9e2n9xaUfI6_A';

if (!navigator.geolocation) {
  alert('Navegador no soporta la geolocalización');
  throw new Error('Navegador no soporta la geolocalización');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
