import { CdkScrollable } from '@angular/cdk/overlay';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarElementDirective, BarMiddleDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { takeUntil } from 'rxjs/operators';
import { MobileMultiComboboxInterface } from '../models/multi-combobox.interface';
import { MULTI_COMBOBOX_COMPONENT } from '../multi-combobox.token';

@Component({
    selector: 'fd-mobile-multi-combobox',
    templateUrl: './mobile-multi-combobox.component.html',
    styleUrl: './mobile-multi-combobox.component.scss',
    standalone: true,
    imports: [
        DialogModule,
        TitleComponent,
        TemplateDirective,
        BarMiddleDirective,
        BarElementDirective,
        NgTemplateOutlet,
        ButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        ButtonBarComponent,
        AsyncPipe,
        FdTranslatePipe
    ]
})
export class MobileMultiComboboxComponent
    extends MobileModeBase<MobileMultiComboboxInterface>
    implements OnInit, OnDestroy
{
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
    selectedShown$ = this._component.selectedShown$;

    /** @ignore */
    private _selectedBackup: SelectableOptionItem[];

    /** @ignore */
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(MULTI_COMBOBOX_COMPONENT) multiComboboxComponent: MobileMultiComboboxInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, multiComboboxComponent, MobileModeControl.MULTI_COMBOBOX, mobileModes);
    }

    /** @ignore */
    ngOnInit(): void {
        this._listenOnMultiComboboxOpenChange();
    }

    /** @ignore */
    ngOnDestroy(): void {
        super.onDestroy();
    }

    /** @ignore */
    showSelected(): void {
        const isSelectedShown = this.selectedShown$.getValue();

        if (isSelectedShown) {
            this._component._searchTermChanged();
            this.selectedShown$.next(false);
            return;
        }

        this._component._moreClicked();
    }

    /** @ignore */
    handleDismiss(): void {
        this.dialogRef.dismiss();
        this._component._dialogDismiss(this._selectedBackup);
    }

    /** @ignore */
    handleApprove(): void {
        this.dialogRef.close();
        this._component._dialogApprove();
    }

    /** @ignore */
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

    /** @ignore */
    private _listenOnMultiComboboxOpenChange(): void {
        this._component.openChange.pipe(takeUntil(this._onDestroy$)).subscribe((isOpen) => this._toggleDialog(isOpen));
    }

    /** @ignore */
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
