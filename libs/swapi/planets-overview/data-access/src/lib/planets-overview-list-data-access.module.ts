import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPlanets from './+state/planets.reducer';
import { PlanetsEffects } from './+state/planets.effects';
import { PlanetsFacade } from './+state/planets.facade';
import { HttpClientModule } from '@angular/common/http';
import { PlanetsOverviewListDataAccessService } from './services/planets-overview-list-data-access.service';
import { PlanetsDetailsEffects } from './+state/planets-details.effects';
import { PlanetsDetailsFacade } from './+state/planets-details.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromPlanets.PLANETS_FEATURE_KEY,
      fromPlanets.reducer
    ),
    EffectsModule.forFeature([PlanetsEffects, PlanetsDetailsEffects])
  ],
  providers: [
    PlanetsFacade,
    PlanetsOverviewListDataAccessService,
    PlanetsDetailsFacade
  ]
})
export class PlanetsOverviewListDataAccessModule {}
