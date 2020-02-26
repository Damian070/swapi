import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { tap } from 'rxjs/operators';
import { SWAPI_API } from '../../../../../../../apps/swapi-app/src/config/swapi.token';

@Injectable({
  providedIn: 'root'
})
export class PlanetsOverviewListDataAccessService {
  constructor(
    @Inject(SWAPI_API) public apiUrl: string,
    private http: HttpClient
  ) {}

  getPlanets(page: number = 1): Observable<any> {
    return this.http.get(this.apiUrl + 'planets/?page=' + page);
  }

  updateFavesLocalStorage(favesPlanetsList: PlanetDetailsInterface[]) {
    const jsonPlanets = JSON.stringify(favesPlanetsList);
    localStorage.setItem('favePlanets', jsonPlanets);
  }

  loadFavesLocalStorage() {
    return of(JSON.parse(localStorage.getItem('favePlanets')));
  }
}
