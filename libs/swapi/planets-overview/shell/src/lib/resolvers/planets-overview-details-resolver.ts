import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { PlanetsFacade } from '@swapi-app/swapi/planets-overview/data-access';

@Injectable()
export class PlanetsOverviewDetailsResolver
  implements Resolve<Observable<any>> {
  constructor(private facade: PlanetsFacade) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.facade.loadPlanetsDetails(route.params.planetId);
    this.facade.getFavouritePlanets();

    return EMPTY;
  }
}
