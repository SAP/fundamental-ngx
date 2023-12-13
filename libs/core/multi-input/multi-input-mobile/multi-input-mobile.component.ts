import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
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
import { Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
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
import { takeUntil } from 'rxjs/operators';
import { MULTI_INPUT_COMPONENT, MultiInputInterface } from '../multi-input.interface';

@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    styleUrl: './multi-input-mobile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DialogModule,
        TitleComponent,
        TemplateDirective,
        BarModule,
        NgTemplateOutlet,
        ButtonComponent,
        CdkScrollable,
        ScrollbarDirective
    ]
})
export class MultiInputMobileComponent extends MobileModeBase<MultiInputInterface> implements OnInit, OnDestroy {
    /** @ignore */
    allItemsSelected: boolean;

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
    private _selectedBackup: any[];

    /** @ignore */
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(MULTI_INPUT_COMPONENT) multiInputComponent: MultiInputInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, multiInputComponent, MobileModeControl.MULTI_INPUT, mobileModes);
    }

    /** @ignore */
    ngOnInit(): void {
        this._listenOnMultiInputOpenChange();
    }

    /** @ignore */
    ngOnDestroy(): void {
        super.onDestroy();
    }

    /** Throw select all event, it's handled by multi input component */
    selectAll(selectAll: boolean): void {
        this._component.selectAllItems(!selectAll);
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

        this._selectedBackup = this._component.selected?.length ? [...this._component.selected] : [];
        if (!this._dialogService.hasOpenDialogs()) {
            this._open();
        }
    }

    /** @ignore */
    private _listenOnMultiInputOpenChange(): void {
        this._component.openChange.pipe(takeUntil(this._onDestroy$)).subscribe((isOpen) => this._toggleDialog(isOpen));
        this._component.allItemsSelectedChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((allItemsSelected) => (this.allItemsSelected = allItemsSelected));
    }

    /** @ignore */
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
