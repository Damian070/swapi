import { ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-planets-overview-container',
  templateUrl: './planets-overview-container.component.html',
  styleUrls: ['./planets-overview-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsOverviewContainerComponent {
}
