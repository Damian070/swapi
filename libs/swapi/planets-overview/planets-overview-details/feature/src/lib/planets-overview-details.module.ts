import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";

import {PlanetsOverviewDetailsDataListModule} from "@swapi-app/swapi/planets-overview/planets-overview-details/data-access";
import { PlanetsOverviewDetailsRoutingModule } from './planets-overview-details-routing.module';
import {PlanetsOverviewDetailsComponent } from './containers/planets-overview-details/planets-overview-details.component'

@NgModule({
  declarations: [PlanetsOverviewDetailsComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    PlanetsOverviewDetailsRoutingModule,
    PlanetsOverviewDetailsDataListModule
  ]
})
export class PlanetsOverviewDetailsModule {}
