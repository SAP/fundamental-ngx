import { Component } from '@angular/core';
import { DefaultDialogObject } from './default-dialog-object';

@Component({
  selector: 'fd-default-dialog',
  templateUrl: './default-dialog.component.html',
  styleUrls: ['./default-dialog.component.scss']
})
export class DefaultDialogComponent {

    /** @hidden */
    defaultDialogConfig: DefaultDialogObject;

    closeButtonClicked(): void {
        this.defaultDialogConfig.closeButtonCallback();
    }

    approveButtonClicked(): void {
        this.defaultDialogConfig.approveButtonCallback();
    }

    CancelButtonClicked(): void {
        this.defaultDialogConfig.cancelButtonCallback();
    }
}
