import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    Optional,
    Output, QueryList,
    TemplateRef,
    ViewChild, ViewChildren
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from '../../dialog/dialog-utils/dialog-config.class';
import { DialogRef } from '../../dialog/dialog-utils/dialog-ref.class';
import { ListItemDirective } from '@fundamental-ngx/core';

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
    readonly dialogApprove: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    readonly dialogDismiss: EventEmitter<any[]> = new EventEmitter<any[]>();

    @ViewChild('wrappedControlTemplate', { read: TemplateRef })
    template: TemplateRef<any>;

    /** @hidden */
    @ViewChildren(ListItemDirective)
    listItems: QueryList<ListItemDirective>;

    private _dialogRef: DialogRef;
    private _selectedBackup: any[];

    constructor(
        @Optional() private dialogService: DialogService,
        @Optional() @Inject(DIALOG_DEFAULT_CONFIG) private _defaultConfig: DialogConfig,
        private _changeDetRef: ChangeDetectorRef
    ) {}

    open(backupSelected: any[]): void {
        this._selectedBackup = backupSelected;
        this._defaultConfig.defaultObject.content = this.listTemplate;
        this._defaultConfig.defaultObject.subHeader = this.template;
        this._defaultConfig.defaultObject.approveButtonCallback = () => this.handleApprove();
        this._defaultConfig.defaultObject.cancelButtonCallback = () => this.handleDismiss();
        this._defaultConfig.defaultObject.closeButtonCallback = () => this.handleDismiss();
        this._dialogRef = this.dialogService.open(
            this._defaultConfig.defaultObject,
            this._defaultConfig
        );

        this._dialogRef.afterClosed.subscribe(
            () => {},
            () => this.handleDismiss());
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

    handleDismiss(): void {
        this._dialogRef.close();
        this._changeDetRef.detectChanges();
        this.dialogDismiss.emit(this._selectedBackup);
    }

    handleApprove(): void {
        this._dialogRef.close();
        this._changeDetRef.detectChanges();
        this.dialogApprove.emit();
    }

}
