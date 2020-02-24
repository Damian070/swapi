import {Component, EventEmitter, Input, Output} from '@angular/core';

import { PlanetsOverviewListComponentPresenter } from './ui-overview-list-pagination.presenter';

@Component({
  selector: 'ui-overview-list-pagination',
  templateUrl: './ui-overview-list-pagination.component.html',
  styleUrls: ['./ui-overview-list-pagination.component.css'],
  providers: [PlanetsOverviewListComponentPresenter]
})
export class UiOverviewListPaginationComponent {
  @Input() favouritesConfig;
  @Input() count: number;
  @Input() set page(page: number) {
    if (page) this.pageNr = page;
  }
  pageNr;
  pageSize = 10;

  @Output() navigateCurrentPage: EventEmitter<number> = new EventEmitter<number>();

  constructor(private presenter: PlanetsOverviewListComponentPresenter) {}

  navigateAndUpdateStateOnPageChange(e) {
    if(this.favouritesConfig) return this.navigateCurrentPage.emit(e.pageIndex);
    this.presenter.navigate(Object.assign(e));
  }
}
