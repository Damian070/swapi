import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class PlanetsOverviewListComponentPresenter {
  constructor(private router: Router) {}

  navigate(e) {
    const pageNr = e.pageIndex + 1;
    this.router.navigate(['/planets' ], {queryParams: {page: pageNr != 1 && pageNr || ''}});
  }
}
