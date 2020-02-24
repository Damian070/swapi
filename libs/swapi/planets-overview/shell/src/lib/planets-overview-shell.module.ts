import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetsOverviewShellRoutingModule } from './planets-overview-shell-routing.module';
import { PlanetsOverviewContainerComponent } from './containers/planets-overview-container/planets-overview-container.component';
import { PlanetsOverviewListResolver } from './resolvers/planets-overview-list-resolver';
import { PlanetsFacade } from '@swapi-app/swapi/planets-overview/data-access';
import { UiHeaderModule } from '@swapi-app/swapi/shared/ui-header';
import { PlanetsOverviewDetailsResolver } from './resolvers/planets-overview-details-resolver';
import { PlanetsDetailsFacade } from '@swapi-app/swapi/planets-overview/data-access';

@NgModule({
  declarations: [PlanetsOverviewContainerComponent],
  imports: [CommonModule, PlanetsOverviewShellRoutingModule, UiHeaderModule],
  providers: [
    PlanetsOverviewListResolver,
    PlanetsOverviewDetailsResolver,
    PlanetsFacade,
    PlanetsDetailsFacade
  ]
})
export class PlanetsOverviewShellModule {}
