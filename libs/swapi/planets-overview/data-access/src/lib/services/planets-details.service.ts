import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, forkJoin, Observable } from 'rxjs';

import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class PlanetsDetailsService {
  constructor(private http: HttpClient) {}
  path = 'https://swapi.co/api/planets/';

  getPlanetsDetails(id: number): Observable<any> {
    return this.http.get<PlanetDetailsInterface>(`${this.path}${id}`);
  }

  //   getPlanetsDetails(id: number): Observable<any> {
  //     return this.http.get<PlanetDetailsInterface>(`${this.path}${id}`).pipe(
  //       mergeMap(res => {
  //
  //         console.log(res);
  //
  //         return forkJoin(res.residents.map(resident => this.http.get(resident))).pipe(
  //           map(residents => [res, residents])
  //         )
  //       })
  //     );
  // }
  // }
}
