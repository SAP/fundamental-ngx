import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    isDevMode,
    Optional,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DIALOG_CONFIG, DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { MULTI_INPUT_MOBILE_CONFIG, MultiInputMobileConfiguration } from './multi-input-mobile-configuration';

@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiInputMobileComponent {

    /** @hidden
     * For internal usage
     * List element, which will be rendered inside dialog.
     */
    @Input()
    listTemplate: TemplateRef<any>;

    /** @hidden
     * For internal usage
     * Control element, which will be rendered inside dialog.
     */
    @Input()
    controlTemplate: TemplateRef<any>;

    /**
     * TODO
     */
    @Input()
    multiInputConfig: MultiInputMobileConfiguration;

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

    /** @hidden
     * Wrapped Control template, passed to dialog
     */
    @ViewChild('wrappedControlTemplate', { read: TemplateRef })
    template: TemplateRef<any>;

    /** @hidden */
    private _dialogRef: DialogRef;
    /** @hidden */
    private _selectedBackup: any[];

    constructor(
        @Optional() private dialogService: DialogService,
        @Optional() @Inject(DIALOG_CONFIG) private _dialogConfig: DialogConfig,
        @Optional() @Inject(MULTI_INPUT_MOBILE_CONFIG) private _providedMultiInputConfig: MultiInputMobileConfiguration,
        private _changeDetRef: ChangeDetectorRef
    ) {}

    /** TODO */
    open(backupSelected: any[]): void {

        if (!this.dialogService && isDevMode()) {
            // TODO: Throw error
        }

        this._selectedBackup = backupSelected;
        this._overwriteDialogProperties();
        this._dialogRef = this.dialogService.open(
            this._dialogConfig.defaultObject,
            this._dialogConfig
        );

        /**
         * Subscribe to errors, which is triggered by backdrop click.
         */
        this._dialogRef.afterClosed.subscribe(
            () => {},
            () => this._handleDismiss());
    }

    /**
     * Method returns, if the dialog is open.
     * It gives information to prevent from having more than 1 dialog .
     * Also removes from DOM, <input> control element, which is rendered in dialog.
     */
    hasOpenDialogs(): boolean {
        return this.dialogService && this.dialogService.hasOpenDialogs()
    }

    /** TODO */
    selectAll(): void {
        this.onAllItemsSelected.emit();
    }

    /** @hidden */
    private _handleDismiss(): void {
        this._dialogRef.close();
        this._changeDetRef.detectChanges();
        this.dialogDismiss.emit(this._selectedBackup);
    }

    /** @hidden */
    private _handleApprove(): void {
        this._dialogRef.close();
        this._changeDetRef.detectChanges();
        this.dialogApprove.emit();
    }

    /** @hidden */
    private _overwriteDialogProperties(): void {
        if (!this._dialogConfig) {
            this._dialogConfig = new DialogConfig();
        }
        if (!this._dialogConfig.defaultObject) {
            this._dialogConfig.defaultObject = {};
        }

        const multiInputConfig = this.getMultiInputConfig();

        this._dialogConfig.defaultObject.cancelButton = multiInputConfig.cancelButton;
        this._dialogConfig.defaultObject.approveButton = multiInputConfig.approveButton;
        this._dialogConfig.defaultObject.title = multiInputConfig.title;
        this._dialogConfig.defaultObject.content = this.listTemplate;
        this._dialogConfig.defaultObject.subHeader = this.template;
        this._dialogConfig.defaultObject.approveButtonCallback = () => this._handleApprove();
        this._dialogConfig.defaultObject.cancelButtonCallback = () => this._handleDismiss();

        if (multiInputConfig.closeButton) {
            this._dialogConfig.defaultObject.closeButtonCallback = () => this._handleDismiss();
        }
    }

    /** @hidden */
    private getMultiInputConfig(): MultiInputMobileConfiguration {
        if (this.multiInputConfig) {
            return this.multiInputConfig;
        } else if (this._providedMultiInputConfig) {
            return this._providedMultiInputConfig;
        } else {
            if (isDevMode()) {
                // TODO throw some error
            }
        }
    }
}
