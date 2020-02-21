import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

export namespace fromPlanetsDetailsActions {
  export enum Types {
    LoadPlanetsDetails = '[Planets Details] Load PlanetsDetails',
    LoadPlanetsDetailsSuccess = '[Planets Details] Load PlanetsDetails Success',
    LoadPlanetsDetailsFailure = '[Planets Details] Load PlanetsDetails Failure',
    AddPlanetsDetailsToFavourites = 'to fav s'
  }

  export class LoadPlanetsDetails implements Action {
    readonly type = Types.LoadPlanetsDetails;

    constructor(public payload: number) {}
  }

  export class LoadPlanetsSuccess implements Action {
    readonly type = Types.LoadPlanetsDetailsSuccess;

    constructor(public payload: planetDetailsInterface) {}
  }

  export class LoadPlanetsFailure implements Action {
    readonly type = Types.LoadPlanetsDetailsFailure;

    constructor(public payload: HttpErrorResponse | null) {}
  }

  export type CollectiveType =
    | LoadPlanetsDetails
    | LoadPlanetsFailure
    | LoadPlanetsSuccess;
}
