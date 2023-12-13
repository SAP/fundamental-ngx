import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { COMBOBOX_COMPONENT, ComboboxInterface } from '../../combobox.interface';

@Component({
    selector: 'fdp-combobox-mobile',
    templateUrl: './combobox-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DialogModule,
        TitleComponent,
        TemplateDirective,
        BarModule,
        NgTemplateOutlet,
        CdkScrollable,
        ScrollbarDirective
    ]
})
export class ComboboxMobileComponent extends MobileModeBase<ComboboxInterface> implements OnInit, OnDestroy {
    /** @ignore */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @ignore
     * For internal usage
     * Control element, which will be rendered inside dialog.
     * List element, which will be rendered inside dialog.
     */
    childContent: Nullable<{
        listTemplate: TemplateRef<any>;
        controlTemplate: TemplateRef<any>;
    }> = null;

    /** @ignore */
    private _selectedBackup: string;

    /** @ignore */
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(COMBOBOX_COMPONENT) comboboxComponent: ComboboxInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, comboboxComponent, MobileModeControl.COMBOBOX, mobileModes);
    }

    /** @ignore */
    ngOnInit(): void {
        this._listenOnMultiInputOpenChange();
    }

    /** @ignore */
    ngOnDestroy(): void {
        super.onDestroy();
    }

    /** @ignore */
    handleDismiss(): void {
        this.dialogRef.dismiss();
        this._component.dialogDismiss(this._selectedBackup);
    }

    /** @ignore */
    handleApprove(): void {
        this.dialogRef.close();
        this._component.dialogApprove();
    }

    /** @ignore */
    private _toggleDialog(open: boolean): void {
        if (!open) {
            return;
        }

        this._selectedBackup = this._component.inputText;
        if (!this._dialogService.hasOpenDialogs()) {
            this._open();
        }
    }

    /** @ignore */
    private _listenOnMultiInputOpenChange(): void {
        this._component.openChange.pipe(takeUntil(this._onDestroy$)).subscribe((isOpen) => this._toggleDialog(isOpen));
    }

    /** @ignore */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            disablePaddings: true,
            ...this.dialogConfig,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement
        });

        // Have to fire "detectChanges" to fix "ExpressionChangedAfterItHasBeenCheckedError"
        this.dialogRef.afterLoaded.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._component.detectChanges();
        });

        const refSub = this.dialogRef.afterClosed.subscribe({
            error: (type) => {
                if (type === 'escape') {
                    this._component.dialogDismiss(this._selectedBackup);
                    refSub.unsubscribe();
                }
            }
        });
    }
}
