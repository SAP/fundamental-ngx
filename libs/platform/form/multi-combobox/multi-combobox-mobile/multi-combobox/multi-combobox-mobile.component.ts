import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SelectableOptionItem } from '@fundamental-ngx/platform/shared';
import { MULTICOMBOBOX_COMPONENT, MultiComboboxInterface } from '../../multi-combobox.interface';

@Component({
    selector: 'fdp-multi-combobox-mobile',
    templateUrl: './multi-combobox-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogModule,
        TitleComponent,
        TemplateDirective,
        BarModule,
        NgTemplateOutlet,
        ButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        FdTranslatePipe
    ]
})
export class MultiComboboxMobileComponent extends MobileModeBase<MultiComboboxInterface> implements OnInit {
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
    constructor(@Inject(MULTICOMBOBOX_COMPONENT) multiComboboxComponent: MultiComboboxInterface) {
        super(multiComboboxComponent, MobileModeControl.MULTI_COMBOBOX);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnMultiComboboxOpenChange();
    }

    /** @hidden */
    showSelected(): void {
        const isSelectedShown = this.selectedShown$();

        if (isSelectedShown) {
            this._component.searchTermChanged();
            this.selectedShown$.set(false);
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
        this._component.openChange
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((isOpen) => this._toggleDialog(isOpen));
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            disablePaddings: true,
            ...this.dialogConfig,
            backdropClickCloseable: false,
            escKeyCloseable: false,
            container: this._elementRef.nativeElement
        });
    }
}
