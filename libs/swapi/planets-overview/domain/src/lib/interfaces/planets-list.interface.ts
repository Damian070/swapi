import { HttpErrorResponse } from '@angular/common/http';
import { PlanetsEntitiesState } from '@swapi-app/swapi/planets-overview/data-access';
import {planetDetailsInterface} from "./planet-details.interface";

export interface planetsListInterface {
  count: number;
  page: number;
  loading: boolean;
  error: HttpErrorResponse | null;
  planets: PlanetsEntitiesState;
  favouritePlanets: PlanetsEntitiesState;
  detailsLoading: boolean,
  planetDetails: planetDetailsInterface,
  detailsError: HttpErrorResponse | null;
}
