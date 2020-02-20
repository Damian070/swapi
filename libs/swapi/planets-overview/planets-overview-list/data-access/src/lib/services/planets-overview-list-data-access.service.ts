import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { planetsListInterface } from '@swapi-app/swapi/planets-overview/domain';

@Injectable({
  providedIn: 'root'
})
export class PlanetsOverviewListDataAccessService {
  apiUrl = 'https://swapi.co/api/';

  constructor(private http: HttpClient) {}

  getPlanets(page: number = 1): Observable<any> {
    return this.http.get(this.apiUrl + 'planets/?page=' + page);
  }
}
