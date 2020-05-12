import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    isDevMode, OnInit,
    Optional,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DIALOG_CONFIG, DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { MULTI_INPUT_MOBILE_CONFIG, MultiInputMobileConfiguration } from './multi-input-mobile-configuration';
import { MultiInputComponent } from '../multi-input.component';

@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiInputMobileComponent implements OnInit {

    multiInputConfig: MultiInputMobileConfiguration;

    /** @hidden
     * For internal usage
     * List element, which will be rendered inside dialog.
     */
    listTemplate: TemplateRef<any>;

    /** @hidden
     * For internal usage
     * Control element, which will be rendered inside dialog.
     */
    controlTemplate: TemplateRef<any>;

    /** @hidden
     * For internal usage
     * Event thrown, when the `all items button` is selected
     */
    @Output()
    readonly onAllItemsSelected: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden
     * For internal usage
     * Event thrown, when dialog is approved. It also triggers model change propagation outside the MultiInputComponent
     */
    @Output()
    readonly dialogApprove: EventEmitter<void> = new EventEmitter<void>();


    /** @hidden
     * For internal usage
     * Event thrown, when dialog is closed, without saving.
     * It has list backup, which is set, when the dialog is opened. If changes are not saved, values re not changed
     */
    @Output()
    readonly dialogDismiss: EventEmitter<any[]> = new EventEmitter<any[]>();

    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    private _dialogRef: DialogRef;
    /** @hidden */
    private _selectedBackup: any[];

    constructor(
        @Optional() private dialogService: DialogService,
        @Optional() private _multiInputComponent: MultiInputComponent,
        @Optional() @Inject(DIALOG_CONFIG) private _dialogConfig: DialogConfig,
        @Optional() @Inject(MULTI_INPUT_MOBILE_CONFIG) private _providedMultiInputConfig: MultiInputMobileConfiguration,
        private _changeDetRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.multiInputConfig = this.getMultiInputConfig();
        if (!this.multiInputConfig) {
            this._listenOnMultiInputOpenChange();
        }
    }

    /** Method that opens dialog with multi input list and control templates */
    open(backupSelected: any[]): void {

        if (!this.dialogService && isDevMode()) {
            throw new Error('There is no dialog service provided. Multi input can\'t be opened');
        }

        this._selectedBackup = backupSelected;
        this._overwriteDialogProperties();
        this._dialogRef = this.dialogService.open(
            this.dialogTemplate,
            this._dialogConfig
        );

        /**
         * Subscribe to errors, which is triggered by backdrop click.
         */
        this._dialogRef.afterClosed.subscribe(
            () => {
            },
            () => this.handleDismiss());
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
        this.onAllItemsSelected.emit();
    }

    /** @hidden */
    public handleDismiss(): void {
        this._dialogRef.close();
        this._changeDetRef.detectChanges();
        this.dialogDismiss.emit(this._selectedBackup);
    }

    /** @hidden */
    public handleApprove(): void {
        this._dialogRef.close();
        this._changeDetRef.detectChanges();
        this.dialogApprove.emit();
    }

    /** @hidden */
    private _overwriteDialogProperties(): void {
        const multiInputConfig = this.getMultiInputConfig();
        if (!multiInputConfig) {
            return;
        }

        if (!this._dialogConfig) {
            this._dialogConfig = new DialogConfig();
        }
    }

    /** @hidden */
    private getMultiInputConfig(): MultiInputMobileConfiguration {
        if (this._multiInputComponent.multiInputMobileConfig) {
            return this.multiInputConfig;
        } else if (this._providedMultiInputConfig) {
            return this._providedMultiInputConfig;
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
            this.open([]);
        }
    }

    /** @hidden */
    private _listenOnMultiInputOpenChange(): void {
        this._multiInputComponent.openChange
            .subscribe(isOpen => this._toggleDialog(isOpen))
        ;
    }
}
