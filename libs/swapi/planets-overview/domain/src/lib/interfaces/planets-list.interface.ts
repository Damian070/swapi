import { HttpErrorResponse } from '@angular/common/http';
import { PlanetsEntitiesState } from '@swapi-app/swapi/planets-overview/planets-overview-list/data-access';

export interface planetsListInterface {
  count: number;
  page: number;
  loading: boolean;
  error: HttpErrorResponse | null;
  planets: PlanetsEntitiesState;
  favouritePlanets: PlanetsEntitiesState;
}
