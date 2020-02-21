import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { PlanetsFacade } from '@swapi-app/swapi/planets-overview/planets-overview-list/data-access';

@Injectable()
export class PlanetsOverviewListResolver implements Resolve<Observable<any>> {
  constructor(private facade: PlanetsFacade) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.facade.getPlanets(route.queryParams.page || 1);
    this.facade.getFavouritePlanets();

    return EMPTY;
  }
}
