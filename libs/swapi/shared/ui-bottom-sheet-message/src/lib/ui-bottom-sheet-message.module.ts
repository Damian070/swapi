import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { UiBottomSheetMessageComponent } from './ui-bottom-sheet-message/ui-bottom-sheet-message.component';

@NgModule({
  declarations: [UiBottomSheetMessageComponent],
  imports: [MatBottomSheetModule, RouterModule, CommonModule, MatListModule],
  exports: [UiBottomSheetMessageComponent]
})
export class UiBottomSheetMessageModule {}
