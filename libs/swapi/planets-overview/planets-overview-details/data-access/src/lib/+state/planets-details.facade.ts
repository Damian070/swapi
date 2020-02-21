import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromPlanetsDetails from './planets-details.reducer';
import * as PlanetsDetailsSelectors from './planets-details.selectors';
import {fromPlanetsDetailsActions} from "./planets-details.actions";

@Injectable()
export class PlanetsDetailsFacade {
  loading$ = this.store.pipe(
    select(PlanetsDetailsSelectors.getPlanetsDetailsLoading)
  );

  error$ = this.store.pipe(
    select(PlanetsDetailsSelectors.getPlanetsDetailsError)
  );

  planetsDetails$ = this.store.pipe(
    select(PlanetsDetailsSelectors.getPlanetsDetails)
  );

  constructor(
    private store: Store<fromPlanetsDetails.PlanetsDetailsPartialState>
  ) {}

  loadPlanetsDetails(planetsId: number) {
    this.store.dispatch(new fromPlanetsDetailsActions.LoadPlanetsDetails(planetsId))
  }
}
