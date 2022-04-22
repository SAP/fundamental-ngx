import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    isDevMode,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { observeOn, takeUntil } from 'rxjs/operators';

import { DialogService } from '@fundamental-ngx/core/dialog';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';

import { COMBOBOX_COMPONENT, ComboboxInterface } from '../combobox.interface';
import { asyncScheduler } from 'rxjs';

@Component({
    selector: 'fd-combobox-mobile',
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
    childContent: { listTemplate: TemplateRef<any>; controlTemplate: TemplateRef<any>; } | null = null;

    /** @hidden */
    private _selectedBackup: string;

    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(COMBOBOX_COMPONENT) comboboxComponent: ComboboxInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, comboboxComponent, MobileModeControl.COMBOBOX, mobileModes);
    }

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

    private _toggleDialog(open: boolean): void {
        if (open) {
            this._selectedBackup = this._component.inputText;
            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
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

        this._focusInputElementOnceOpened();

        const refSub = this.dialogRef.afterClosed.subscribe({
            error: (type) => {
                if (type === 'escape') {
                    this._component.dialogDismiss(this._selectedBackup);
                    refSub.unsubscribe();
                }
            }
        });
    }

    /** @hidden */
    private _focusInputElementOnceOpened(): void {
        this.dialogRef.afterLoaded
            .pipe(
                observeOn(asyncScheduler), // making the listener async
                takeUntil(this._onDestroy$)
            )
            .subscribe(() => {
                try {
                    const input = this._elementRef.nativeElement.querySelector('fd-input-group input[role="combobox"]');
                    input.focus();
                } catch (error) {
                    if (isDevMode()) {
                        console.error('Failed to focus combobox search input', error);
                    }
                }
            });
    }
}
