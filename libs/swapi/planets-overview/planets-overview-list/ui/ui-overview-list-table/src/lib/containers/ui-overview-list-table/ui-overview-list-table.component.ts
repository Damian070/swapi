import {Component, Input, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpErrorResponse} from "@angular/common/http";

import { planetDetailsInterface } from "@swapi-app/swapi/planets-overview/domain";

@Component({
  selector: 'ui-overview-list-table',
  templateUrl: './ui-overview-list-table.component.html',
  styleUrls: ['./ui-overview-list-table.component.css']
})

export class UiOverviewListTableComponent  {
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse | null;
  @Input() set planets(planets: planetDetailsInterface[]) {
    this.dataSource = new MatTableDataSource<planetDetailsInterface>(planets);
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['name', 'population', 'climate',  'gravity', 'actions'];
  dataSource: MatTableDataSource<planetDetailsInterface>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

json;

  constructor() {
    this.json =JSON;
  }

}
