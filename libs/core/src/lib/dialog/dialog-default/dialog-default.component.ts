import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';

@Component({
    selector: 'fd-dialog-default',
    templateUrl: './dialog-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDefaultComponent implements AfterViewInit {

    /** @hidden */
    defaultDialogConfig: DialogDefaultContent;

    /** @hidden */
    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden
     * TODO: Inspect why DialogDefaultComponents needs change detection re-run to render adjusted content (dialog header title)
     * */
    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

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
