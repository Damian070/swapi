import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';

import { fromPlanetsActions } from './planets.actions';
import { PlanetsOverviewListDataAccessService } from '../services/planets-overview-list-data-access.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PlanetsEffects {
  @Effect()
  loadPlanets$ = this.actions$.pipe(
    ofType(fromPlanetsActions.Types.LoadPlanets),
    switchMap((action: fromPlanetsActions.LoadPlanets) =>
      this.dataAccessService.getPlanets(action.payload).pipe(
        map(planets => new fromPlanetsActions.LoadPlanetsSuccess(planets)),
        catchError(error => of(new fromPlanetsActions.LoadPlanetsFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataAccessService: PlanetsOverviewListDataAccessService
  ) {}
}
