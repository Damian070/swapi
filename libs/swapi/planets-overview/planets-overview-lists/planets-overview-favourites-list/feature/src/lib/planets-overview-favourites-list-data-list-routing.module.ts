import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanetsOverviewFavouritesListComponent } from './containers/planets-overview-list/planets-overview-favourites-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlanetsOverviewFavouritesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsOverviewFavouritesListDataListRoutingModule {}
