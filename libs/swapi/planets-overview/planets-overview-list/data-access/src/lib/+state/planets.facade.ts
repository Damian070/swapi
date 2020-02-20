import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

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

  constructor(private store: Store<fromPlanets.PlanetsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getPlanets(page = 1) {
    this.dispatch(new fromPlanetsActions.LoadPlanets(page));
  }
}
