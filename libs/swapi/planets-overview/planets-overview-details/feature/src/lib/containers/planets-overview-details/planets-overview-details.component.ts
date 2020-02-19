import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'planets-overview-details',
  templateUrl: './planets-overview-details.component.html',
  styleUrls: ['./planets-overview-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsOverviewDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
