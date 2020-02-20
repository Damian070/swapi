import { Injectable } from '@angular/core';
import {Actions, ofType, Effect} from '@ngrx/effects';
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

import {fromPlanetsDetailsActions} from './planets-details.actions';
import {PlanetsDetailsService} from '../services/planets-details.service'

@Injectable()
export class PlanetsDetailsEffects {

  @Effect()
  loadPlanetsDetails$ = this.actions$.pipe(
    ofType(fromPlanetsDetailsActions.Types.LoadPlanetsDetails),
    mergeMap((action:fromPlanetsDetailsActions.LoadPlanetsDetails) =>
      this.apiService.getPlanetsDetails(action.payload).pipe(
        map(planetsDetails => new fromPlanetsDetailsActions.LoadPlanetsSuccess(planetsDetails)),
        catchError(err => of(new fromPlanetsDetailsActions.LoadPlanetsFailure(err)))
      ))
  );

  constructor(private actions$: Actions, private apiService: PlanetsDetailsService) {}
}
