import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';

import { UiOverviewListPaginationComponent } from './containers/ui-overview-list-pagination/ui-overview-list-pagination.component';

@NgModule({
  declarations: [UiOverviewListPaginationComponent],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  exports: [UiOverviewListPaginationComponent]
})
export class UiOverviewListPaginationModule { }
