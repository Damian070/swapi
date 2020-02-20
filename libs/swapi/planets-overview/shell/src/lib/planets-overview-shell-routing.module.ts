import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetsOverviewContainerComponent } from './containers/planets-overview-container/planets-overview-container.component';
import {PlanetsOverviewListResolver} from './resolvers/planets-overview-list-resolver'

const routes: Routes = [
  {
    path: '',
    component: PlanetsOverviewContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        resolve: {planets: PlanetsOverviewListResolver},
        loadChildren: () =>
          import(
            '@swapi-app/swapi/planets-overview/planets-overview-list/feature'
            ).then(m => m.PlanetsOverviewListDataListModule)
      },
      {
        path: ':pageNr',
        resolve: {planets: PlanetsOverviewListResolver},
        loadChildren: () =>
          import(
            '@swapi-app/swapi/planets-overview/planets-overview-list/feature'
            ).then(m => m.PlanetsOverviewListDataListModule)
      },
      {
        path: 'details/:planet-id',
        loadChildren: () =>
          import(
            '@swapi-app/swapi/planets-overview/planets-overview-details/feature'
          ).then(m => m.PlanetsOverviewDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsOverviewShellRoutingModule {}
