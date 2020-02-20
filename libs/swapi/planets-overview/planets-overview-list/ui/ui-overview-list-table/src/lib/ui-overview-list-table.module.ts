import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { UiOverviewListTableComponent } from './containers/ui-overview-list-table/ui-overview-list-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  UiBottomSheetMessageComponent,
  UiBottomSheetMessageModule
} from "@swapi-app/swapi/shared/ui-bottom-sheet-message";

@NgModule({
  declarations: [UiOverviewListTableComponent],
  imports: [
    UiBottomSheetMessageModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [UiOverviewListTableComponent],

  entryComponents: [UiBottomSheetMessageComponent]
})
export class UiOverviewListTableModule {}
