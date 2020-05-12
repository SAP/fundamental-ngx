import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultDialogObject } from './default-dialog-object';

@Component({
    selector: 'fd-default-dialog',
    templateUrl: './default-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultDialogComponent {

    /** @hidden */
    defaultDialogConfig: DefaultDialogObject;

    /** @hidden */
    closeButtonClicked(): void {
        this.defaultDialogConfig.closeButtonCallback();
    }

    /** @hidden */
    approveButtonClicked(): void {
        this.defaultDialogConfig.approveButtonCallback();
    }

    /** @hidden */
    CancelButtonClicked(): void {
        this.defaultDialogConfig.cancelButtonCallback();
    }
}
