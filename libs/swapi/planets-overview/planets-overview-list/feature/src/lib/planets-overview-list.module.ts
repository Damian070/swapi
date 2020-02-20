import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiOverviewListTableModule } from '@swapi-app/swapi/planets-overview/planets-overview-list/ui/ui-overview-list-table';
import { PlanetsOverviewListDataAccessModule } from '@swapi-app/swapi/planets-overview/planets-overview-list/data-access';

import { PlanetsOverviewListRoutingModule } from './planets-overview-list-routing.module';
import { PlanetsOverviewListComponent } from './containers/planets-overview-list/planets-overview-list.component';
import { UiOverviewListPaginationModule } from '@swapi-app/swapi/planets-overview/planets-overview-list/ui/ui-planets-overview-list-pagination/ui-overview-list-pagination';

@NgModule({
  declarations: [PlanetsOverviewListComponent],
  imports: [
    CommonModule,
    PlanetsOverviewListRoutingModule,
    PlanetsOverviewListDataAccessModule,
    UiOverviewListTableModule,
    UiOverviewListPaginationModule
  ]
})
export class PlanetsOverviewListModule {}
