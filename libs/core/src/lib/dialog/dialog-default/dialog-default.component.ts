import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';

/** Dialog component used to create the dialog in object based approach */
@Component({
    selector: 'fd-dialog-default',
    templateUrl: './dialog-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDefaultComponent implements AfterViewInit {
    /** @hidden */
    _defaultDialogContent: DialogDefaultContent;

    /** @hidden */
    _defaultDialogConfiguration: DialogConfig;

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
        return (
            this._defaultDialogContent &&
            !!(this._defaultDialogContent.cancelButton || this._defaultDialogContent.approveButton)
        );
    }

    /** @hidden */
    _closeButtonClicked(): void {
        this._defaultDialogContent.closeButtonCallback?.();
    }

    /** @hidden */
    _approveButtonClicked(): void {
        this._defaultDialogContent.approveButtonCallback?.();
    }

    /** @hidden */
    _cancelButtonClicked(): void {
        this._defaultDialogContent.cancelButtonCallback?.();
    }
}
