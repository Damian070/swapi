import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {planetDetailsInterface} from "@swapi-app/swapi/planets-overview/domain";

@Injectable({
  providedIn: 'root'
})
export class PlanetsDetailsService {
  apiPath: 'https://swapi.co/api/planets/';

  constructor(private http: HttpClient) { }

  getPlanetsDetails(id: number): Observable<planetDetailsInterface> {
    return this.http.get<planetDetailsInterface>(this.apiPath + id);
  }
}
