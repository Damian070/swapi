import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { SWAPI_API } from '../../../../../../../apps/swapi-app/src/config/swapi.token';

@Injectable({
  providedIn: 'any'
})
export class PlanetsDetailsService {
  constructor(private http: HttpClient, @Inject(SWAPI_API) public apiUrl) {}

  getPlanetsDetails(id: number): Observable<any> {
    return this.http.get<PlanetDetailsInterface>(`${this.apiUrl}/planets${id}`);
  }
}
