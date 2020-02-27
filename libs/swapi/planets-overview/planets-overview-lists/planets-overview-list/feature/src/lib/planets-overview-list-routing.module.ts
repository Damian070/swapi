import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlanetsOverviewListComponent } from './containers/planets-overview-list/planets-overview-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlanetsOverviewListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsOverviewListRoutingModule {}
