import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { Nullable, TemplateDirective, TemplateModule } from '@fundamental-ngx/cdk/utils';
import { BarElementDirective, BarMiddleDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogCloseButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MobileMultiComboboxInterface } from '../models/multi-combobox.interface';
import { MULTI_COMBOBOX_COMPONENT } from '../multi-combobox.token';

@Component({
    selector: 'fd-mobile-multi-combobox',
    templateUrl: './mobile-multi-combobox.component.html',
    styleUrl: './mobile-multi-combobox.component.scss',
    imports: [
        TemplateModule,
        BarMiddleDirective,
        BarElementDirective,
        ButtonBarComponent,
        TitleComponent,
        TitleComponent,
        TemplateDirective,
        BarMiddleDirective,
        BarElementDirective,
        NgTemplateOutlet,
        ButtonComponent,
        ButtonBarComponent,
        FdTranslatePipe,
        AsyncPipe,
        DialogComponent,
        DialogHeaderComponent,
        DialogCloseButtonComponent,
        DialogBodyComponent,
        DialogFooterComponent
    ]
})
export class MobileMultiComboboxComponent extends MobileModeBase<MobileMultiComboboxInterface> implements OnInit {
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
    selectedShown$ = this._component.selectedShown$;

    /** @hidden */
    private _selectedBackup: SelectableOptionItem[];

    /** @hidden */
    constructor(@Inject(MULTI_COMBOBOX_COMPONENT) multiComboboxComponent: MobileMultiComboboxInterface) {
        super(multiComboboxComponent, MobileModeControl.MULTI_COMBOBOX);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnMultiComboboxOpenChange();
    }

    /** @hidden */
    showSelected(): void {
        const isSelectedShown = this.selectedShown$.getValue();

        if (isSelectedShown) {
            this._component._searchTermChanged();
            this.selectedShown$.next(false);
            return;
        }

        this._component._moreClicked();
    }

    /** @hidden */
    handleDismiss(): void {
        this.dialogRef.dismiss();
        this._component._dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    handleApprove(): void {
        this.dialogRef.close();
        this._component._dialogApprove();
    }

    /** @hidden */
    private _toggleDialog(open: boolean): void {
        if (!open) {
            return;
        }

        this._selectedBackup = this._component._selectedSuggestions?.length
            ? [...this._component._selectedSuggestions]
            : [];
        if (!this._dialogService.hasOpenDialogs()) {
            this._open();
        }
    }

    /** @hidden */
    private _listenOnMultiComboboxOpenChange(): void {
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
            escKeyCloseable: false,
            container: this._elementRef.nativeElement,
            disablePaddings: true
        });
    }
}
