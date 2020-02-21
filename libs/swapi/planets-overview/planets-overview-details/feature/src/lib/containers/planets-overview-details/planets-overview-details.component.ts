import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PlanetsDetailsFacade } from '@swapi-app/swapi/planets-overview/planets-overview-details/data-access';

@Component({
  selector: 'planets-overview-details',
  templateUrl: './planets-overview-details.component.html',
  styleUrls: ['./planets-overview-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsOverviewDetailsComponent implements OnInit {
  planetsDetails$ = this.facade.planetsDetails$;
  error$ = this.facade.error$;
  loading$ = this.facade.loading$;

  constructor(private facade: PlanetsDetailsFacade) {}

  ngOnInit(): void {}
}
