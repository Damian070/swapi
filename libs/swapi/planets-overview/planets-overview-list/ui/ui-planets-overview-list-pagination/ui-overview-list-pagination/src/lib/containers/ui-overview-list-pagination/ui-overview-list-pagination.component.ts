import { Component, Input } from '@angular/core';

import { PlanetsOverviewListComponentPresenter } from './ui-overview-list-pagination.presenter';

@Component({
  selector: 'ui-overview-list-pagination',
  templateUrl: './ui-overview-list-pagination.component.html',
  styleUrls: ['./ui-overview-list-pagination.component.css'],
  providers: [PlanetsOverviewListComponentPresenter]
})
export class UiOverviewListPaginationComponent {
  @Input() count: number;
  @Input() set page(page: number) {
    // console.log(page);
    if (page) this.pageNr = page;
  }
  pageNr;
  pageSize = 10;

  constructor(private presenter: PlanetsOverviewListComponentPresenter) {}

  navigateAndUpdateStateOnPageChange(e) {
    // console.log(e);
    this.presenter.navigate(Object.assign(e));
  }
}
