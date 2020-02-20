import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

import {UiHeaderComponent} from './containers/ui-header/ui-header.component'

@NgModule({
  declarations: [UiHeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [UiHeaderComponent]
})

export class UiHeaderModule { }
