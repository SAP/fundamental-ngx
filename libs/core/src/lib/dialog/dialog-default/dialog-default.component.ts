import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import {
    DeprecatedInitialFocusDirective,
    InitialFocusDirective,
    Nullable,
    TemplateDirective
} from '@fundamental-ngx/cdk/utils';

import { DialogConfig } from '../utils/dialog-config.class';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { DialogFooterComponent } from '../dialog-footer/dialog-footer.component';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { DialogCloseButtonComponent } from '../dialog-close-button/dialog-close-button.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';
import { DialogComponent } from '../dialog.component';

/** Dialog component used to create the dialog in object based approach */
@Component({
    selector: 'fd-dialog-default',
    templateUrl: './dialog-default.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TitleComponent,
        NgIf,
        DialogCloseButtonComponent,
        TemplateDirective,
        NgTemplateOutlet,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        InitialFocusDirective,
        DeprecatedInitialFocusDirective,
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
}
