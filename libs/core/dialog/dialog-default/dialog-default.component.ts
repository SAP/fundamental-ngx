import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { InitialFocusDirective, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DialogCloseButtonComponent } from '../dialog-close-button/dialog-close-button.component';
import { DialogFooterComponent } from '../dialog-footer/dialog-footer.component';
import { DialogFullScreenTogglerButtonComponent } from '../dialog-full-screen-toggler-button/dialog-full-screen-toggler-button.component';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';
import { DialogComponent } from '../dialog.component';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';

/** Dialog component used to create the dialog in object based approach */
@Component({
    selector: 'fd-dialog-default',
    templateUrl: './dialog-default.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TitleComponent,
        DialogFullScreenTogglerButtonComponent,
        DialogCloseButtonComponent,
        TemplateDirective,
        NgTemplateOutlet,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        DialogFooterComponent,
        BarModule,
        InitialFocusDirective,
        ContentDensityDirective
    ]
})
export class DialogDefaultComponent implements AfterViewInit {
    /** @hidden */
    _defaultDialogContent: Nullable<DialogDefaultContent>;

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
            !!this._defaultDialogContent &&
            !!(this._defaultDialogContent.cancelButton || this._defaultDialogContent.approveButton)
        );
    }

    /** @hidden */
    _closeButtonClicked(): void {
        this._defaultDialogContent?.closeButtonCallback?.();
    }

    /** @hidden */
    _approveButtonClicked(): void {
        this._defaultDialogContent?.approveButtonCallback?.();
    }

    /** @hidden */
    _cancelButtonClicked(): void {
        this._defaultDialogContent?.cancelButtonCallback?.();
    }

    /** @hidden */
    _fullScreenButtonClicked(): void {
        this._defaultDialogContent?.fullScreenButtonCallback?.();
    }
}
