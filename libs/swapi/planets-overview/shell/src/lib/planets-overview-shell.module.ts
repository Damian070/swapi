import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetsOverviewShellRoutingModule } from './planets-overview-shell-routing.module';
import {PlanetsOverviewContainerComponent} from './containers/planets-overview-container/planets-overview-container.component'


@NgModule({
  declarations: [PlanetsOverviewContainerComponent],
  imports: [
    CommonModule,
    PlanetsOverviewShellRoutingModule
  ]
})
export class PlanetsOverviewShellModule { }
