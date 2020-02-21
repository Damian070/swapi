import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {UiPlanetsOverviewDetailsCardComponent} from "./ui-planets-overview-details-card/ui-planets-overview-details-card.component";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [UiPlanetsOverviewDetailsCardComponent],
  exports: [
    UiPlanetsOverviewDetailsCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class PlanetsOverviewDetailsUiModule { }
