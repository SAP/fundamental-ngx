import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    isDevMode, OnInit,
    Optional,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { MultiInputMobileConfiguration } from './multi-input-mobile-configuration';
import { MultiInputComponent } from '../multi-input.component';

@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiInputMobileComponent implements OnInit, AfterViewInit {

    /** @hidden */
    multiInputConfig: MultiInputMobileConfiguration;

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
    private _selectedBackup: any[];

    constructor(
        @Optional() private dialogService: DialogService,
        @Optional() private _multiInputComponent: MultiInputComponent,
        private _changeDetRef: ChangeDetectorRef,
        private _elementRef: ElementRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.multiInputConfig = this.getMultiInputConfig();
        if (this.multiInputConfig) {
            this._listenOnMultiInputOpenChange();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (!this.dialogService && isDevMode()) {
            throw new Error('There is no dialog service provided. Multi input can\'t be opened');
        }
        this._overwriteDialogProperties();
        this._open();
        this._dialogRef.hide(true);
    }

    /**
     * Method returns, if the dialog is open.
     * It gives information to prevent from having more than 1 dialog .
     * Also removes from DOM, <input> control element, which is rendered in dialog.
     */
    hasOpenDialogs(): boolean {
        return this.dialogService && this.dialogService.hasOpenDialogs();
    }

    /** Throw select all event, it's handled by multi input component */
    selectAll(): void {
        this._multiInputComponent.selectAllItems();
    }

    /** @hidden */
    public handleDismiss(): void {
        this._dialogRef.hide(true);
        this._multiInputComponent.dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    public handleApprove(): void {
        this._dialogRef.hide(true);
        this._multiInputComponent.dialogApprove();
    }

    /** @hidden */
    private _overwriteDialogProperties(): void {
        const multiInputConfig = this.getMultiInputConfig();
        if (!multiInputConfig) {
            return;
        }

        if (!this._multiInputComponent.dialogConfig) {
            this._multiInputComponent.dialogConfig = new DialogConfig();
        }
    }

    /** @hidden */
    private getMultiInputConfig(): MultiInputMobileConfiguration {
        if (this._multiInputComponent.multiInputMobileConfig) {
            return this._multiInputComponent.multiInputMobileConfig;
        } else if (this._multiInputComponent.providedMultiInputConfig) {
            return this._multiInputComponent.providedMultiInputConfig;
        } else {
            if (isDevMode()) {
                throw new Error('There is no multi input configuration object provided. ' +
                    'You need to pass it as a "[multiInputMobileConfig]",' +
                    'or provide it with "MULTI_INPUT_MOBILE_CONFIG" injection token'
                );
            }
        }
    }

    private _toggleDialog(open: boolean): void {
        if (open) {
            this._selectedBackup = [...this._multiInputComponent.selected];
            if (!this.hasOpenDialogs()) {
                this._open();
            }
        }
        this._dialogRef.hide(!open);
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._multiInputComponent.openChange
            .subscribe(isOpen => this._toggleDialog(isOpen))
        ;
    }

    private _open(): void {
        this._dialogRef = this.dialogService.open(
            this.dialogTemplate,
            {
                ...this._multiInputComponent.dialogConfig,
                backdropClickCloseable: false,
                container: this._elementRef.nativeElement
            }
        );
    }
}
