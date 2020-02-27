import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiOverviewListTableModule } from '@swapi-app/swapi/planets-overview/planets-overview-lists/shared/ui/ui-overview-list-table';
import { PlanetsOverviewDataAccessModule } from '@swapi-app/swapi/planets-overview/data-access';

import { PlanetsOverviewFavouritesListDataListRoutingModule } from './planets-overview-favourites-list-data-list-routing.module';
import { PlanetsOverviewFavouritesListComponent } from './containers/planets-overview-list/planets-overview-favourites-list.component';
import { UiOverviewListPaginationModule } from '@swapi-app/swapi/planets-overview/planets-overview-lists/shared/ui/ui-planets-overview-list-pagination/ui-overview-list-pagination';

@NgModule({
  declarations: [PlanetsOverviewFavouritesListComponent],
  imports: [
    PlanetsOverviewDataAccessModule,
    CommonModule,
    PlanetsOverviewFavouritesListDataListRoutingModule,
    UiOverviewListTableModule,
    UiOverviewListPaginationModule
  ]
})
export class PlanetsOverviewFavouritesListDataListModule {}
