import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    Optional,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';

@Component({
    selector: 'fd-multi-input-mobile',
    templateUrl: './multi-input-mobile.component.html',
    styleUrls: ['./multi-input-mobile.component.scss']
})
export class MultiInputMobileComponent {

    @Input()
    listTemplate: TemplateRef<any>;

    @Input()
    controlTemplate: TemplateRef<any>;

    /**
     * TODO
     */
    @Input()
    dialogConfig: DialogConfig;

    @Output()
    readonly onAllItemsSelected: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    readonly dialogClose: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('wrappedControlTemplate', { read: TemplateRef })
    template: TemplateRef<any>;

    private _dialogRef: DialogRef;

    constructor(
        @Optional() private dialogService: DialogService,
        @Optional() @Inject(DIALOG_DEFAULT_CONFIG) private _defaultConfig: DialogConfig,
        private _changeDetRef: ChangeDetectorRef
    ) {}

    open(): void {
        this._defaultConfig.defaultObject.content = this.listTemplate;
        this._defaultConfig.defaultObject.subHeader = this.template;
        this._defaultConfig.defaultObject.approveButtonCallback = () => this.onClose();
        this._defaultConfig.defaultObject.cancelButtonCallback = () => this.onClose();
        this._defaultConfig.defaultObject.closeButtonCallback = () => this.onClose();
        this._dialogRef = this.dialogService.open(
            this._defaultConfig.defaultObject,
            this._defaultConfig
        );

        this._dialogRef.afterClosed.subscribe(
            () => {},
            () => this.handleClose());
    }

    hasOpenDialogs(): boolean {
        return this.dialogService && this.dialogService.hasOpenDialogs()
    }

    dialogs(): void {
        this._changeDetRef.detectChanges();
    }

    selectAll(): void {
        this.onAllItemsSelected.emit();
    }

    onClose(): void {
        this._dialogRef.close();
        this.handleClose();
    }

    handleClose(): void {
        this._changeDetRef.detectChanges();
        this.dialogClose.emit();
    }

}
