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

import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { COMBOBOX_COMPONENT, ComboboxInterface } from '../../combobox.interface';
import { Nullable } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fdp-combobox-mobile',
    templateUrl: './combobox-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ComboboxMobileComponent extends MobileModeBase<ComboboxInterface> implements OnInit, OnDestroy {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden
     * For internal usage
     * Control element, which will be rendered inside dialog.
     * List element, which will be rendered inside dialog.
     */
    childContent: Nullable<{
        listTemplate: TemplateRef<any>;
        controlTemplate: TemplateRef<any>;
    }> = null;

    /** @hidden */
    private _selectedBackup: string;

    /** @hidden */
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(COMBOBOX_COMPONENT) comboboxComponent: ComboboxInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, comboboxComponent, MobileModeControl.COMBOBOX, mobileModes);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnMultiInputOpenChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.onDestroy();
    }

    /** @hidden */
    handleDismiss(): void {
        this.dialogRef.dismiss();
        this._component.dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    handleApprove(): void {
        this.dialogRef.close();
        this._component.dialogApprove();
    }

    /** @hidden */
    private _toggleDialog(open: boolean): void {
        if (!open) {
            return;
        }

        this._selectedBackup = this._component.inputText;
        if (!this._dialogService.hasOpenDialogs()) {
            this._open();
        }
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._component.openChange.pipe(takeUntil(this._onDestroy$)).subscribe((isOpen) => this._toggleDialog(isOpen));
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            verticalPadding: false,
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
