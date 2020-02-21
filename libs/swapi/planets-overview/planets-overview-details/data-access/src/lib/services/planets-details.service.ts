import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {planetDetailsInterface} from "@swapi-app/swapi/planets-overview/domain";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "any"
})
export class PlanetsDetailsService {
  constructor(private http: HttpClient) { }
  path = 'https://swapi.co/api/planets/';

  getPlanetsDetails(id: number): Observable<planetDetailsInterface> {
    return this.http.get<planetDetailsInterface>(`${this.path}${id}`).pipe(
      tap(console.log)
    );
  }
}
