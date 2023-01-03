import { Component, ElementRef, Inject, OnDestroy, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { takeUntil } from 'rxjs/operators';
import { MultiComboboxInterface } from '../models/multi-combobox.interface';
import { MULTI_COMBOBOX_COMPONENT } from '../multi-combobox.interface';

@Component({
    selector: 'fd-mobile-multi-combobox',
    templateUrl: './mobile-multi-combobox.component.html',
    styleUrls: ['./mobile-multi-combobox.component.scss']
})
export class MobileMultiComboboxComponent extends MobileModeBase<MultiComboboxInterface> implements OnInit, OnDestroy {
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
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(MULTI_COMBOBOX_COMPONENT) multiComboboxComponent: MultiComboboxInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, multiComboboxComponent, MobileModeControl.MULTI_COMBOBOX, mobileModes);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnMultiComboboxOpenChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.onDestroy();
    }

    /** @hidden */
    showSelected(): void {
        const isSelectedShown = this.selectedShown$.getValue();

        if (isSelectedShown) {
            this._component.searchTermChanged();
            this.selectedShown$.next(false);
            return;
        }

        this._component.moreClicked();
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

        this._selectedBackup = this._component._selectedSuggestions?.length
            ? [...this._component._selectedSuggestions]
            : [];
        if (!this._dialogService.hasOpenDialogs()) {
            this._open();
        }
    }

    /** @hidden */
    private _listenOnMultiComboboxOpenChange(): void {
        this._component.openChange.pipe(takeUntil(this._onDestroy$)).subscribe((isOpen) => this._toggleDialog(isOpen));
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            ...this.dialogConfig,
            backdropClickCloseable: false,
            escKeyCloseable: false,
            container: this._elementRef.nativeElement
        });
    }
}
