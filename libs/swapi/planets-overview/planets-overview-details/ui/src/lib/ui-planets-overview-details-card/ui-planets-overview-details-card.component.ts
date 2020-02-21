import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { planetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ui-planets-overview-details-card',
  templateUrl: './ui-planets-overview-details-card.component.html',
  styleUrls: ['./ui-planets-overview-details-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiPlanetsOverviewDetailsCardComponent implements OnInit {
  @Input() planetDetails: planetDetailsInterface;
  @Input() error: null | HttpErrorResponse;
  @Input() loading: boolean;

  @Output() toggleFavouriteStatus: EventEmitter<boolean>;

  constructor() {}

  ngOnInit(): void {}
}
