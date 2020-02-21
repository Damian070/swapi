import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import * as fromPlanets from './planets.reducer';
import * as PlanetsSelectors from './planets.selectors';
import { fromPlanetsActions } from './planets.actions';
import { PlanetsOverviewListDataAccessService } from '../services/planets-overview-list-data-access.service';

@Injectable()
export class PlanetsFacade {
  loading$ = this.store.pipe(select(PlanetsSelectors.getPlanetsLoading));
  allPlanets$ = this.store.pipe(select(PlanetsSelectors.getAllPlanets));
  error$ = this.store.pipe(select(PlanetsSelectors.getPlanetsError));
  page$ = this.store.pipe(select(PlanetsSelectors.getPlanetsPage));
  count$ = this.store.pipe(select(PlanetsSelectors.getPlanetsCount));
  favouritePlanets$ = this.store.pipe(
    select(PlanetsSelectors.getFavouritePlanets)
  );
  favouritePlanetsArray$ = this.store.pipe(
    select(PlanetsSelectors.getFavouritePlanetsArray)
  );

  constructor(private store: Store<fromPlanets.PlanetsPartialState>) {}

  togglePlanetsFavouriteStatus(planetsDetails: planetDetailsInterface) {
    this.store.dispatch(
      new fromPlanetsActions.TogglePlanetsFavouriteStatus(planetsDetails)
    );
  }

  getFavouritePlanets() {
    this.store.dispatch(new fromPlanetsActions.LoadPlanetsFavourites());
  }

  getPlanets(page: number = 1) {
    this.store.dispatch(new fromPlanetsActions.LoadPlanets(page));
  }
}
