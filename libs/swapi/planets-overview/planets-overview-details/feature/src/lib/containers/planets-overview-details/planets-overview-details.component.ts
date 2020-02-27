import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PlanetsFacade } from '@swapi-app/swapi/planets-overview/data-access';
import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

@Component({
  selector: 'app-planets-overview-details',
  templateUrl: './planets-overview-details.component.html',
  styleUrls: ['./planets-overview-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsOverviewDetailsComponent {
  planetsDetails$ = this.facade.planetsDetails$;
  error$ = this.facade.planetsDetailserror$;
  loading$ = this.facade.planetsDetailsloading$;
  favourites$ = this.facade.favouritePlanetsArray$;

  onTogglePlanetsFavouriteStatus(planetDetails: PlanetDetailsInterface): void {
    this.facade.togglePlanetsFavouriteStatus(planetDetails);
  }

  constructor(private facade: PlanetsFacade) {}
}
