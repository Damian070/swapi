import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PlanetsFacade } from '@swapi-app/swapi/planets-overview/data-access';
import { Observable } from 'rxjs';

import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';

function returnChunkedArray(array) {
  var i,
    j,
    temparray,
    currentIteration = 0,
    chunk = 10,
    resultArray: any[] = [];

  for (i = 0, j = array.length; i < j; i += chunk) {
    temparray = array.slice(i, i + chunk);

    resultArray[currentIteration] = temparray;

    currentIteration++;
  }

  return resultArray;
}

@Component({
  selector: 'planets-overview-list',
  templateUrl: './planets-overview-favourites-list.component.html',
  styleUrls: ['./planets-overview-favourites-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsOverviewFavouritesListComponent implements OnInit {
  pagesCount: number = 1;
  currentPage: number = 0;
  chunkedFavPlanets: PlanetDetailsInterface[][];
  favouritePlanetsArray$: Observable<PlanetDetailsInterface[]> = this.facade
    .favouritePlanetsArray$;

  constructor(private facade: PlanetsFacade) {}

  onTogglePlanetsFavouriteStatus(planetsDetails: PlanetDetailsInterface) {
    this.facade.togglePlanetsFavouriteStatus(planetsDetails);
  }

  onNavigateCurrentPage(newCurrent: number) {
    this.currentPage = newCurrent;
  }

  ngOnInit(): void {
    this.favouritePlanetsArray$.subscribe(faves => {
      this.chunkedFavPlanets = returnChunkedArray(faves);
      this.pagesCount = faves.length;
    });
  }
}
