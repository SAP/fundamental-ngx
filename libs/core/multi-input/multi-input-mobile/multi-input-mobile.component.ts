import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { MULTI_INPUT_COMPONENT, MultiInputInterface } from '../multi-input.interface';

@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    styleUrl: './multi-input-mobile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
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
        ButtonBarComponent,
        NgTemplateOutlet,
        ButtonComponent,
        DialogComponent,
        DialogHeaderComponent,
        DialogFooterComponent,
        DialogBodyComponent,
        DialogCloseButtonComponent
    ]
})
export class MultiInputMobileComponent extends MobileModeBase<MultiInputInterface> implements OnInit {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    allItemsSelected: boolean;

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
    private _selectedBackup: any[];

    /** @hidden */
    constructor(@Inject(MULTI_INPUT_COMPONENT) multiInputComponent: MultiInputInterface) {
        super(multiInputComponent, MobileModeControl.MULTI_INPUT);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnMultiInputOpenChange();
    }

    /** Throw select all event, it's handled by multi input component */
    selectAll(selectAll: boolean): void {
        this._component.selectAllItems(!selectAll);
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

        this._selectedBackup = this._component.selected?.length ? [...this._component.selected] : [];
        if (!this._dialogService.hasOpenDialogs()) {
            this._open();
        }
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._component.openChange
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((isOpen) => this._toggleDialog(isOpen));
        this._component.allItemsSelectedChange
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((allItemsSelected) => (this.allItemsSelected = allItemsSelected));
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
