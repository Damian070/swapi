import { HttpErrorResponse } from '@angular/common/http';
import { PlanetsEntitiesState } from './planets-entities-state.interface';
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
