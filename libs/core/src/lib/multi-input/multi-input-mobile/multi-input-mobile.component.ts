import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { takeUntil } from 'rxjs/operators';
import { MULTI_INPUT_COMPONENT, MultiInputInterface } from '../multi-input.interface';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeControlName,
    MobileModeToken
} from '../../utils/base-class/mobile-mode.class';


@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    styleUrls: ['./multi-input-mobile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MultiInputMobileComponent extends MobileModeBase<MultiInputInterface> implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden
     * For internal usage
     * Control element, which will be rendered inside dialog.
     * List element, which will be rendered inside dialog.
     */
    childContent: {
        listTemplate: TemplateRef<any>,
        controlTemplate: TemplateRef<any>
    } = null;

    /** @hidden */
    private _selectedBackup: any[];

    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(MULTI_INPUT_COMPONENT) multiInputComponent: MultiInputInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeToken[]
    ) {
        super(
            elementRef,
            dialogService,
            multiInputComponent,
            MobileModeControlName.MULTI_INPUT,
            mobileModes
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnMultiInputOpenChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._open();
        this.dialogRef.hide(true);
    }

    /** Throw select all event, it's handled by multi input component */
    selectAll(): void {
        this._component.selectAllItems();
    }

    /** @hidden */
    handleDismiss(): void {
        this.dialogRef.hide(true);
        this._component.dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    handleApprove(): void {
        this.dialogRef.hide(true);
        this._component.dialogApprove();
    }

    /** @hidden */
    private _toggleDialog(open: boolean): void {
        if (open) {
            this._selectedBackup = [...this._component.selected];
            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        }
        this.dialogRef.hide(!open);
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._component.openChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(isOpen => this._toggleDialog(isOpen));
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(
            this.dialogTemplate,
            {
                mobile: true,
                verticalPadding: false,
                ...this.dialogConfig,
                backdropClickCloseable: false,
                escKeyCloseable: false,
                container: this._elementRef.nativeElement
            }
        );
    }
}
