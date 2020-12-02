import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';

/** Dialog component used to create the dialog in object based approach */
@Component({
    selector: 'fd-dialog-default',
    templateUrl: './dialog-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDefaultComponent implements AfterViewInit {

    /** @hidden */
    _defaultDialogConfig: DialogDefaultContent;

    /** @hidden */
    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden
     * TODO: Inspect why DialogDefaultComponents needs change detection re-run to render adjusted content (dialog header title)
     * */
    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    /** Whether there is a approve button, or cancel button text */
    _showFooter(): boolean {
        return this._defaultDialogConfig &&
            !!(this._defaultDialogConfig.cancelButton || this._defaultDialogConfig.approveButton)
        ;
    }

    /** @hidden */
    _closeButtonClicked(): void {
        this._defaultDialogConfig.closeButtonCallback();
    }

    /** @hidden */
    _approveButtonClicked(): void {
        this._defaultDialogConfig.approveButtonCallback();
    }

    /** @hidden */
    _cancelButtonClicked(): void {
        this._defaultDialogConfig.cancelButtonCallback();
    }
}
