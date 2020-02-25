import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromPlanetsDetails from './planets.reducer';
import {
  getPlanetsDetails,
  getPlanetsDetailsError,
  getPlanetsDetailsLoading,
  getFavouritePlanetsArray
} from './planets.selectors';
import { fromPlanetsActions } from './planets.actions';
import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

@Injectable()
export class PlanetsDetailsFacade {
  loading$ = this.store.pipe(select(getPlanetsDetailsLoading));

  error$ = this.store.pipe(select(getPlanetsDetailsError));

  planetsDetails$ = this.store.pipe(select(getPlanetsDetails));

  favourites$ = this.store.pipe(select(getFavouritePlanetsArray));

  constructor(private store: Store<fromPlanetsDetails.PlanetsPartialState>) {}

  loadPlanetsDetails(planetsId: number) {
    this.store.dispatch(new fromPlanetsActions.LoadPlanetDetails(planetsId));
  }

  loadFaves() {
    this.store.dispatch(new fromPlanetsActions.LoadPlanetsFavourites());
  }

  togglePlanetsFavouriteStatus(planetsDetails: PlanetDetailsInterface) {
    this.store.dispatch(
      new fromPlanetsActions.TogglePlanetsFavouriteStatus(planetsDetails)
    );
  }
}
