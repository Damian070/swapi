import { HttpErrorResponse } from '@angular/common/http';
import { PlanetsEntitiesState } from '@swapi-app/swapi/planets-overview/data-access';
import { PlanetDetailsInterface } from './planet-details.interface';

export interface PlanetsListInterface {
  count: number;
  page: number;
  loading: boolean;
  error: HttpErrorResponse | null;
  planets: PlanetsEntitiesState;
  favouritePlanets: PlanetsEntitiesState;
  detailsLoading: boolean;
  planetDetails: PlanetDetailsInterface;
  detailsError: HttpErrorResponse | null;
}
