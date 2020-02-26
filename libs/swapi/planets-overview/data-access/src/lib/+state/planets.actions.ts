import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

export namespace fromPlanetsActions {
  export enum Types {
    LoadPlanets = '[Planets List] Load Planets',
    LoadPlanetsSuccess = '[Planets List] Load Planets Success',
    LoadPlanetsFail = '[Planets List] Load Planets Fail',
    TogglePlanetsFavouriteStatus = '[Planets List] Toggle Planets Favourite Status',
    LoadPlanetsFavourites = '[Planets List] Load Planets Favourites',
    LoadPlanetsFavouritesSuccess = '[Planets List] Load Planets Favourites Success',
    LoadPlanetDetails = '[Planet Details] Load Planet Details',
    LoadPlanetDetailsSuccess = '[Planet Details] Load Planet Details Success',
    LoadPlanetDetailsFailure = '[Planet Details] Load planet Details Failure'
  }

  export class TogglePlanetsFavouriteStatus implements Action {
    readonly type = Types.TogglePlanetsFavouriteStatus;

    constructor(public payload: PlanetDetailsInterface) {}
  }

  export class LoadPlanetsFavourites implements Action {
    readonly type = Types.LoadPlanetsFavourites;
  }

  export class LoadPlanetsFavouritesSuccess implements Action {
    readonly type = Types.LoadPlanetsFavouritesSuccess;

    constructor(public payload: PlanetDetailsInterface[]) {}
  }

  export class LoadPlanets implements Action {
    readonly type = Types.LoadPlanets;

    constructor(public payload: number) {}
  }

  export class LoadPlanetsSuccess implements Action {
    readonly type = Types.LoadPlanetsSuccess;

    constructor(
      public payload: {
        results: PlanetDetailsInterface[];
        count: number;
        page: number;
      }
    ) {}
  }

  export class LoadPlanetsFail implements Action {
    readonly type = Types.LoadPlanetsFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class LoadPlanetDetails implements Action {
    readonly type = Types.LoadPlanetDetails;

    constructor(public payload: number) {}
  }

  export class LoadPlanetDetailsSuccess implements Action {
    readonly type = Types.LoadPlanetDetailsSuccess;

    constructor(public payload: PlanetDetailsInterface) {}
  }

  export class LoadPlanetDetailsFailure implements Action {
    readonly type = Types.LoadPlanetDetailsFailure;

    constructor(public payload: HttpErrorResponse | null) {}
  }

  export type CollectiveType =
    | LoadPlanetsFavourites
    | LoadPlanetsFavouritesSuccess
    | TogglePlanetsFavouriteStatus
    | LoadPlanets
    | LoadPlanetsFail
    | LoadPlanetsSuccess
    | LoadPlanetDetails
    | LoadPlanetDetailsFailure
    | LoadPlanetDetailsSuccess;
}
