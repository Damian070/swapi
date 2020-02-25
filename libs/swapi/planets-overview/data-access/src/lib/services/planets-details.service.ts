import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { mergeMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class PlanetsDetailsService {
  constructor(private http: HttpClient) {}
  path = 'https://swapi.co/api/planets/';

  getPlanetsDetails(id: number): Observable<any> {
    return this.http.get<PlanetDetailsInterface>(`${this.path}${id}`);
  }
}
