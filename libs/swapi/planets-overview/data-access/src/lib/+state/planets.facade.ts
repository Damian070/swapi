import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import * as fromPlanets from './planets.reducer';
import * as PlanetsSelectors from './planets.selectors';
import { fromPlanetsActions } from './planets.actions';

@Injectable()
export class PlanetsFacade {
  loading$ = this.store.pipe(select(PlanetsSelectors.getPlanetsLoading));
  allPlanets$ = this.store.pipe(select(PlanetsSelectors.getAllPlanets));
  error$ = this.store.pipe(select(PlanetsSelectors.getPlanetsError));
  page$ = this.store.pipe(select(PlanetsSelectors.getPlanetsPage));
  count$ = this.store.pipe(select(PlanetsSelectors.getPlanetsCount));
  favouritePlanetsArray$ = this.store.pipe(
    select(PlanetsSelectors.getFavouritePlanetsArray)
  );

  constructor(private store: Store<fromPlanets.PlanetsPartialState>) {}

  togglePlanetsFavouriteStatus(planetsDetails: PlanetDetailsInterface): void {
    this.store.dispatch(
      new fromPlanetsActions.TogglePlanetsFavouriteStatus(planetsDetails)
    );
  }

  getFavouritePlanets(): void {
    this.store.dispatch(new fromPlanetsActions.LoadPlanetsFavourites());
  }

  getPlanets(page: number = 1): void {
    this.store.dispatch(new fromPlanetsActions.LoadPlanets(page));
  }
}
