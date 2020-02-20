import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class PlanetsOverviewListComponentPresenter {
  constructor(private router: Router) {
  }

  navigate(e) {
    const pageNr = e.pageIndex + 1;
    this.router.navigate(['/', pageNr != 1 && pageNr || '' ]);
  }
}
