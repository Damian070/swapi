import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanetDetailsInterface } from '@swapi-app/swapi/planets-overview/domain';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ui-planets-overview-details-card',
  templateUrl: './ui-planets-overview-details-card.component.html',
  styleUrls: ['./ui-planets-overview-details-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiPlanetsOverviewDetailsCardComponent {
  @Input() planetDetails;
  @Input() error: null | HttpErrorResponse;
  @Input() loading: boolean;
  @Input() set favourites(faves: PlanetDetailsInterface[]) {
    this.favesMap = {};

    faves.forEach(({ name }) => {
      this.favesMap[name] = name;
    });
  }

  @Output() toggleFavouriteStatus: EventEmitter<
    PlanetDetailsInterface
  > = new EventEmitter<PlanetDetailsInterface>();

  favesMap: object;

  onClickToggleFavStatus() {
    this.toggleFavouriteStatus.emit(this.planetDetails);
  }
}
