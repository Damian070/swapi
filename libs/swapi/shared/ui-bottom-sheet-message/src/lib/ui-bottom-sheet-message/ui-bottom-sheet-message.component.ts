import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'ui-bottom-sheet-message',
  templateUrl: './ui-bottom-sheet-message.component.html',
  styleUrls: ['./ui-bottom-sheet-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiBottomSheetMessageComponent {
  message: string;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<UiBottomSheetMessageComponent>,
    private _location: Location,
    @Inject(MAT_BOTTOM_SHEET_DATA) data
  ) {
    this.message = data.message;
  }

  dismissSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  navigateBackwards() {
    this._location.back();
  }
}
