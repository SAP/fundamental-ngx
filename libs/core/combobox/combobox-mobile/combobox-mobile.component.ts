import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    isDevMode,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { observeOn } from 'rxjs/operators';

import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';

import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitialFocusDirective, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarElementDirective, BarMiddleDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';

import {
    DialogBodyComponent,
    DialogCloseButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { asyncScheduler } from 'rxjs';
import { COMBOBOX_COMPONENT, ComboboxInterface } from '../combobox.interface';

@Component({
    selector: 'fd-combobox-mobile',
    templateUrl: './combobox-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        TemplateDirective,
        BarMiddleDirective,
        BarElementDirective,
        ButtonBarComponent,
        DialogHeaderComponent,
        DialogCloseButtonComponent,
        DialogComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        TitleComponent,
        TitleComponent,
        TemplateDirective,
        NgTemplateOutlet,
        InitialFocusDirective
    ]
})
export class ComboboxMobileComponent extends MobileModeBase<ComboboxInterface> implements OnInit {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /**
     * @hidden
     * For internal usage
     * Control element, which will be rendered inside dialog.
     * List element, which will be rendered inside dialog.
     */
    childContent: { listTemplate: TemplateRef<any>; controlTemplate: TemplateRef<any> } | null = null;

    /** @hidden */
    private _selectedBackup: string;

    /** @hidden */
    constructor(@Inject(COMBOBOX_COMPONENT) comboboxComponent: ComboboxInterface) {
        super(comboboxComponent, MobileModeControl.COMBOBOX);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnMultiInputOpenChange();
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
        if (open) {
            this._selectedBackup = this._component.getValue();
            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        }
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._component.openChange
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((isOpen) => this._toggleDialog(isOpen));
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            ...this.dialogConfig,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement,
            disablePaddings: true
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
                takeUntilDestroyed(this._destroyRef)
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
