import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogDefaultContent } from '../utils/dialog-default-content';

@Component({
    selector: 'fd-dialog-default',
    templateUrl: './dialog-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDefaultComponent {

    /** @hidden */
    defaultDialogConfig: DialogDefaultContent;

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
