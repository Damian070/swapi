import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

@Injectable({
  providedIn: 'root'
})
export class PlanetsOverviewListDataAccessService {
  apiUrl = 'https://swapi.co/api/';

  constructor(private http: HttpClient) {}

  getPlanets(page: number = 1): Observable<any> {
    return this.http.get(this.apiUrl + 'planets/?page=' + page);
  }

  updateFavesLocalStorage(favesPlanetsList: planetDetailsInterface[]) {
    // console.log('updateFavesLocalStorage run');
    const jsonPlanets = JSON.stringify(favesPlanetsList);
    localStorage.setItem('favePlanets', jsonPlanets);
  }

  loadFavesLocalStorage() {
    return of(JSON.parse(localStorage.getItem('favePlanets')));
  }
}
