import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    isDevMode,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { COMBOBOX_COMPONENT, ComboboxInterface } from '../combobox.interface';

@Component({
    selector: 'fd-combobox-mobile',
    templateUrl: './combobox-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ComboboxMobileComponent implements OnInit, AfterViewInit, OnDestroy {

    /** @hidden */
    comboboxMobileConfig: MobileModeConfig;

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
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    private _dialogRef: DialogRef;

    /** @hidden */
    private _selectedBackup: string;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _dialogService: DialogService,
        @Inject(COMBOBOX_COMPONENT) private _comboboxComponent: ComboboxInterface,
        private _elementRef: ElementRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.comboboxMobileConfig = this.getMultiInputConfig();
        if (this.comboboxMobileConfig) {
            this._listenOnMultiInputOpenChange();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._open();
        this._dialogRef.hide(true);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    handleDismiss(): void {
        this._dialogRef.hide(true);
        this._comboboxComponent.dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    handleApprove(): void {
        this._dialogRef.hide(true);
        this._comboboxComponent.dialogApprove();
    }

    /** @hidden */
    private getMultiInputConfig(): MobileModeConfig {
        if (this._comboboxComponent.mobileConfig) {
            return this._comboboxComponent.mobileConfig;
        } else {
            if (isDevMode()) {
                throw new Error('There is no combobox configuration object provided. ' +
                    'You need to pass it as a "[mobileConfig]",' +
                    'or provide it with "COMBOBOX_MOBILE_CONFIG" injection token'
                );
            }
        }
    }

    private _toggleDialog(open: boolean): void {
        if (open) {
            this._selectedBackup = this._comboboxComponent.inputText;
            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        }
        this._dialogRef.hide(!open);
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._comboboxComponent.openChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(isOpen => this._toggleDialog(isOpen))
        ;
    }

    /** @hidden */
    private _open(): void {
        this._dialogRef = this._dialogService.open(
            this.dialogTemplate,
            {
                ...this._comboboxComponent.dialogConfig,
                backdropClickCloseable: false,
                escKeyCloseable: false,
                container: this._elementRef.nativeElement
            }
        );
    }
}
