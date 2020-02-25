import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetsOverviewContainerComponent } from './containers/planets-overview-container/planets-overview-container.component';
import { PlanetsOverviewListResolver } from './resolvers/planets-overview-list-resolver';
import { PlanetsOverviewDetailsResolver } from './resolvers/planets-overview-details-resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'planets'
  },
  {
    path: 'planets',
    component: PlanetsOverviewContainerComponent,
    children: [
      {
        path: '',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: { planets: PlanetsOverviewListResolver },
        loadChildren: () =>
          import(
            '@swapi-app/swapi/planets-overview/planets-overview-lists/planets-overview-list/feature'
          ).then(m => m.PlanetsOverviewListDataListModule)
      },
      {
        path: 'details/:planetId',
        resolve: { planetDetails: PlanetsOverviewDetailsResolver },
        loadChildren: () =>
          import(
            '@swapi-app/swapi/planets-overview/planets-overview-details/feature'
          ).then(m => m.PlanetsOverviewDetailsModule)
      }
    ]
  },
  {
    path: 'favourites',
    component: PlanetsOverviewContainerComponent,
    children: [
      {
        path: '',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: { planets: PlanetsOverviewListResolver },
        loadChildren: () =>
          import(
            '@swapi-app/swapi/planets-overview/planets-overview-lists/planets-overview-favourites-list/feature'
          ).then(m => m.PlanetsOverviewFavouritesListDataListModule)
      },
      {
        path: 'details/:planetId',
        resolve: { planetDetails: PlanetsOverviewDetailsResolver },
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
