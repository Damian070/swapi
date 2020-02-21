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

import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { UiBottomSheetMessageComponent } from '@swapi-app/swapi/shared/ui-bottom-sheet-message';

@Component({
  selector: 'ui-overview-list-table',
  templateUrl: './ui-overview-list-table.component.html',
  styleUrls: ['./ui-overview-list-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiOverviewListTableComponent {
  @Input() loading: boolean;
  @Input() set favouritePlanets(faves: planetDetailsInterface[]) {
    console.log(faves)
    this.faves = JSON.stringify(faves);
  }
  @Input() set error(error: HttpErrorResponse | null) {
    this.httpError = error;
    error && this.triggerBottomSheet(error);
  }
  @Input() set planets(planets: planetDetailsInterface[]) {

    console.log(planets);
    this.dataSource = new MatTableDataSource<planetDetailsInterface>(planets);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource)
  }

  @Output() togglePlanetsFavouriteStatus: EventEmitter<
    planetDetailsInterface
  > = new EventEmitter<planetDetailsInterface>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  faves;

  httpError: HttpErrorResponse | null;

  displayedColumns: string[] = [
    'name',
    'population',
    'climate',
    'gravity',
    'actions'
  ];
  dataSource: MatTableDataSource<planetDetailsInterface>;

  json;

  constructor(private _bottomSheet: MatBottomSheet) {
    this.json = JSON;
  }

  onTogglePlanetsFavouriteStatus(planetsDetails: planetDetailsInterface) {
    this.togglePlanetsFavouriteStatus.emit(planetsDetails);
  }

  triggerBottomSheet(error) {
    const sheetRef = this._bottomSheet.open(UiBottomSheetMessageComponent, {
      data: {
        message: error.error.detail
      }
    });
    sheetRef.disableClose = true;
  }
}
