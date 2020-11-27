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

    /** Whether there is a approve button, or cancel button text */
    showFooter(): boolean {
        return this.defaultDialogConfig &&
            !!(this.defaultDialogConfig.cancelButton || this.defaultDialogConfig.approveButton)
        ;
    }

    /** @hidden */
    closeButtonClicked(): void {
        this.defaultDialogConfig.closeButtonCallback();
    }

    /** @hidden */
    approveButtonClicked(): void {
        this.defaultDialogConfig.approveButtonCallback();
    }

    /** @hidden */
    cancelButtonClicked(): void {
        this.defaultDialogConfig.cancelButtonCallback();
    }
}
