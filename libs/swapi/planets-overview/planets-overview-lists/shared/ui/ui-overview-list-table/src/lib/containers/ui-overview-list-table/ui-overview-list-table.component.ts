import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { UiBottomSheetMessageComponent } from '@swapi-app/swapi/shared/ui-bottom-sheet-message';

@Component({
  selector: 'ui-overview-list-table',
  templateUrl: './ui-overview-list-table.component.html',
  styleUrls: ['./ui-overview-list-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiOverviewListTableComponent {
  @Input() favouritesConfig?;
  @Input() loading: boolean;
  @Input() set favouritePlanets(faves: PlanetDetailsInterface[]) {
    this.favesMap = {};
    faves.forEach(fav => (this.favesMap[fav.name] = fav.name));
  }
  @Input() set error(error: HttpErrorResponse | null) {
    this.httpError = error;
    error && this.triggerBottomSheet(error);
  }
  @Input() set planets(planets: PlanetDetailsInterface[]) {
    this.dataSource = new MatTableDataSource<PlanetDetailsInterface>(planets);
    this.dataSource.sort = this.sort;
  }

  @Output() togglePlanetsFavouriteStatus: EventEmitter<
    PlanetDetailsInterface
  > = new EventEmitter<PlanetDetailsInterface>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  favesMap: object = {};

  httpError: HttpErrorResponse | null;

  displayedColumns: string[] = [
    'name',
    'population',
    'climate',
    'gravity',
    'actions'
  ];
  dataSource: MatTableDataSource<PlanetDetailsInterface>;

  constructor(private _bottomSheet: MatBottomSheet) {}

  onTogglePlanetsFavouriteStatus(planetsDetails: PlanetDetailsInterface): void {
    this.togglePlanetsFavouriteStatus.emit(planetsDetails);
  }

  triggerBottomSheet(error): void {
    const sheetRef = this._bottomSheet.open(UiBottomSheetMessageComponent, {
      data: {
        message: error.error.detail
      }
    });
    sheetRef.disableClose = true;
  }
}
