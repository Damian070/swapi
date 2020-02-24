import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PlanetsFacade } from '@swapi-app/swapi/planets-overview/data-access';
import { Observable } from 'rxjs';

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'planets-overview-list',
  templateUrl: './planets-overview-list.component.html',
  styleUrls: ['./planets-overview-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsOverviewListComponent implements OnInit {
  planets$: Observable<planetDetailsInterface[]> = this.facade.allPlanets$;
  error$: Observable<HttpErrorResponse | null> = this.facade.error$;
  loading$: Observable<boolean> = this.facade.loading$;
  count$: Observable<number> = this.facade.count$;
  page$: Observable<number> = this.facade.page$;
  favouritePlanetsArray$: Observable<planetDetailsInterface[]> = this.facade
    .favouritePlanetsArray$;

  constructor(private facade: PlanetsFacade) {}

  onTogglePlanetsFavouriteStatus(planetsDetails: planetDetailsInterface) {
    this.facade.togglePlanetsFavouriteStatus(planetsDetails);
  }

  ngOnInit(): void {}
}