import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { fromPlanetsActions } from './planets.actions';
import { PlanetsDetailsService } from '../services/planets-details.service';

@Injectable()
export class PlanetsDetailsEffects {
  @Effect()
  loadPlanetsDetails$ = this.actions$.pipe(
    ofType(fromPlanetsActions.Types.LoadPlanetDetails),
    mergeMap((action: fromPlanetsActions.LoadPlanetDetails) =>
      this.apiService.getPlanetsDetails(action.payload).pipe(
        map(
          planetsDetails =>
            new fromPlanetsActions.LoadPlanetSuccess(planetsDetails)
        ),
        catchError(err =>
          of(new fromPlanetsActions.LoadPlanetFailure(err))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: PlanetsDetailsService
  ) {}
}
