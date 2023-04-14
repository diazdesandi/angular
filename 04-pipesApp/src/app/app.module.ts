import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VentasModule } from './ventas/ventas.module';
import { AppRouterModule } from './app-router.module';

// Cambiar locale(región) de la App.
import localeEs from '@angular/common/locales/es-MX';
import localeFr from '@angular/common/locales/fr';

import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);
registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    VentasModule,
    SharedModule,
    AppRouterModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
