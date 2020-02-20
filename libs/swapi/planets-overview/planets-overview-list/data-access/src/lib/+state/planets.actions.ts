import { Action } from '@ngrx/store';

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

import { HttpErrorResponse } from '@angular/common/http';

export namespace fromPlanetsActions {
  export enum Types {
    LoadPlanets = '[Planets List] Load Planets',
    LoadPlanetsSuccess = '[Planets List] Load Planets Success',
    LoadPlanetsFail = '[Planets List] Load Planets Fail'
  }

  export class LoadPlanets implements Action {
    readonly type = Types.LoadPlanets;

    constructor(public payload: number) {}
  }

  export class LoadPlanetsSuccess implements Action {
    readonly type = Types.LoadPlanetsSuccess;

    constructor(public payload: planetDetailsInterface[]) {}
  }

  export class LoadPlanetsFail implements Action {
    readonly type = Types.LoadPlanetsFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export type CollectiveType =
    | LoadPlanets
    | LoadPlanetsFail
    | LoadPlanetsSuccess;
}
