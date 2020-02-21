import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";

import * as fromPlanetsDetails from './+state/planets-details.reducer';
import { PlanetsDetailsEffects } from './+state/planets-details.effects';
import { PlanetsDetailsFacade } from './+state/planets-details.facade';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    StoreModule.forFeature(
      fromPlanetsDetails.PLANETSDETAILS_FEATURE_KEY,
      fromPlanetsDetails.reducer
    ),
    EffectsModule.forFeature([PlanetsDetailsEffects])
  ],
  providers: [PlanetsDetailsFacade]
})
export class PlanetsOverviewDetailsDataAccessModule {}
