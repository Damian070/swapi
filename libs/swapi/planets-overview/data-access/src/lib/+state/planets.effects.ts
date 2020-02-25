import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { fromPlanetsActions } from './planets.actions';
import { PlanetsOverviewListDataAccessService } from '../services/planets-overview-list-data-access.service';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { getFavouritePlanetsArray } from './planets.selectors';

import { PlanetsPartialState } from './planets.reducer';

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

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

  @Effect({
    dispatch: false
  })
  saveFaveToLocalStorage$ = this.actions$.pipe(
    ofType(fromPlanetsActions.Types.TogglePlanetsFavouriteStatus),
    withLatestFrom(this.store$.select(getFavouritePlanetsArray)),
    tap(([action, faves]) =>
      this.dataAccessService.updateFavesLocalStorage(faves)
    )
  );

  @Effect()
  loadFavesFromLocalStorage$ = this.actions$.pipe(
    ofType(fromPlanetsActions.Types.LoadPlanetsFavourites),
    mergeMap(() =>
      this.dataAccessService
        .loadFavesLocalStorage()
        .pipe(
          map(
            (faves: planetDetailsInterface[]) =>
              new fromPlanetsActions.LoadPlanetsFavouritesSuccess(faves)
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private dataAccessService: PlanetsOverviewListDataAccessService,
    private store$: Store<PlanetsPartialState>
  ) {}
}
