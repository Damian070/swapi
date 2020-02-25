import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class PlanetsOverviewListComponentPresenter {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  navigate(e): void {
    const pageNr = e.pageIndex + 1;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: (pageNr != 1 && pageNr) || '' }
    });
  }
}
