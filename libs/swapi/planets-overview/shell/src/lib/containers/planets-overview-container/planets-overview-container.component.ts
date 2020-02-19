import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'planets-overview-container',
  templateUrl: './planets-overview-container.component.html',
  styleUrls: ['./planets-overview-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlanetsOverviewContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
