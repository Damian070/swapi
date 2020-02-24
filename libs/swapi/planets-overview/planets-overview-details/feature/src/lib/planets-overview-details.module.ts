import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PlanetsOverviewListDataAccessModule } from '@swapi-app/swapi/planets-overview/data-access';
import { PlanetsOverviewDetailsRoutingModule } from './planets-overview-details-routing.module';
import { PlanetsOverviewDetailsComponent } from './containers/planets-overview-details/planets-overview-details.component';
import { PlanetsOverviewDetailsUiModule } from '@swapi-app/swapi/planets-overview/planets-overview-details/ui';

@NgModule({
  declarations: [PlanetsOverviewDetailsComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    PlanetsOverviewDetailsRoutingModule,
    PlanetsOverviewListDataAccessModule,
    PlanetsOverviewDetailsUiModule
  ]
})
export class PlanetsOverviewDetailsModule {}
