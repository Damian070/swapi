import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PlanetsOverviewShellModule } from '@swapi-app/swapi/planets-overview/shell';
import { NxModule } from '@nrwl/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SWAPI_API } from '@swapi-app/swapi/planets-overview/domain';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PlanetsOverviewShellModule,
    RouterModule.forRoot([]),
    EffectsModule.forRoot([]),
    NxModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    BrowserAnimationsModule
  ],
  providers: [{ provide: SWAPI_API, useValue: 'https://swapi.co/api/' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
