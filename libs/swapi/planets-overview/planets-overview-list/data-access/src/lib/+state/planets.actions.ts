import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

export namespace fromPlanetsActions {
  export enum Types {
    LoadPlanets = '[Planets List] Load Planets',
    LoadPlanetsSuccess = '[Planets List] Load Planets Success',
    LoadPlanetsFail = '[Planets List] Load Planets Fail',
    TogglePlanetsFavouriteStatus = '[Planets List] Toggle Planets Favourite Status'
  }

  export class TogglePlanetsFavouriteStatus implements Action{
    readonly type = Types.TogglePlanetsFavouriteStatus;

    constructor(public payload: planetDetailsInterface) {}
  }

  export class LoadPlanets implements Action {
    readonly type = Types.LoadPlanets;

    constructor(public payload: number) {}
  }

  export class LoadPlanetsSuccess implements Action {
    readonly type = Types.LoadPlanetsSuccess;

    constructor(public payload: {results: planetDetailsInterface[]}) {}
  }

  export class LoadPlanetsFail implements Action {
    readonly type = Types.LoadPlanetsFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export type CollectiveType =
    TogglePlanetsFavouriteStatus
    | LoadPlanets
    | LoadPlanetsFail
    | LoadPlanetsSuccess;
}
