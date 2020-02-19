import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PlanetsOverviewContainerComponent} from './containers/planets-overview-container/planets-overview-container.component'


const routes: Routes = [{
  path: '',
  component: PlanetsOverviewContainerComponent,
  children: [
    {
    path: '',
    loadChildren: () => import('@swapi-app/swapi/planets-overview/planets-overview-list/feature').then(m=> m.PlanetsOverviewListModule)
  },
    {
      path: ':planet-id',
      loadChildren: () => import('@swapi-app/swapi/planets-overview/planets-overview-details/feature').then(m => m.PlanetsOverviewDetailsModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsOverviewShellRoutingModule { }
