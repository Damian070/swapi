import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PlanetsOverviewDetailsComponent} from './containers/planets-overview-details/planets-overview-details.component'


const routes: Routes = [{
  path: '', component: PlanetsOverviewDetailsComponent, pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsOverviewDetailsRoutingModule { }
