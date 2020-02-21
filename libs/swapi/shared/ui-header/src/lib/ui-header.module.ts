import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UiHeaderComponent } from './containers/ui-header/ui-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UiHeaderComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule],
  exports: [UiHeaderComponent]
})
export class UiHeaderModule {}
