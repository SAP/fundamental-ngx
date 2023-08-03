import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-upload-collection-button-group',
    host: { class: 'fd-upload-collection__button-group' },
    templateUrl: './upload-collection-button-group.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadCollectionButtonGroupComponent {
    /** @hidden */
    _editMode = false;

    /** Event emitted when the user clicks the edit button. */
    @Output()
    readonly editClicked = new EventEmitter<boolean>();

    /** Event emitted when the user clicks the OK button to conform a file name change. */
    @Output()
    readonly okClicked = new EventEmitter<any>();

    /** Event emitted when the user clicks the delete button. */
    @Output()
    readonly deleteClicked = new EventEmitter<any>();

    /** Whether or not to allow file name editing. Default is true. */
    @Input()
    allowFileNameEdit = true;

    /** Whether or not to show the delete button. Default is true. */
    @Input()
    allowFileDeletion = true;

    /** Whether or not to disable the file name edit button. Default is false. */
    @Input()
    disableFileNameEdit = false;

    /** Whether or not to disable the delete button. Default is false. */
    @Input()
    disableFileDeletion = false;

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Ok' button.
     */
    @Input()
    set okText(value: string) {
        console.warn(
            "Property okText is deprecated. Use i18n capabilities 'coreUploadCollection.menuOkText' key instead."
        );
        this._okText = value;
    }

    get okText(): string {
        return this._okText;
    }

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Cancel' button.
     */
    @Input()
    set cancelText(value: string) {
        console.warn(
            "Property cancelText is deprecated. Use i18n capabilities 'coreUploadCollection.menuCancelText' key instead."
        );
        this._cancelText = value;
    }

    get cancelText(): string {
        return this._cancelText;
    }

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Edit' aria-label.
     */
    @Input()
    set editAriaLabel(value: string) {
        console.warn(
            "Property editAriaLabel is deprecated. Use i18n capabilities 'coreUploadCollection.menuEditAriaLabel' key instead."
        );
        this._editAriaLabel = value;
    }

    get editAriaLabel(): string {
        return this._editAriaLabel;
    }

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Delete' aria-label.
     */
    @Input()
    set deleteAriaLabel(value: string) {
        console.warn(
            "Property deleteAriaLabel is deprecated. Use i18n capabilities 'coreUploadCollection.menuDeleteAriaLabel' key instead."
        );
        this._deleteAriaLabel = value;
    }

    get deleteAriaLabel(): string {
        return this._deleteAriaLabel;
    }

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Ok' aria-label.
     */
    @Input()
    set okAriaLabel(value: string) {
        console.warn(
            "Property okAriaLabel is deprecated. Use i18n capabilities 'coreUploadCollection.menuOkAriaLabel' key instead."
        );
        this._okAriaLabel = value;
    }

    get okAriaLabel(): string {
        return this._okAriaLabel;
    }

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Cancel' aria-label.
     */
    @Input()
    set cancelAriaLabel(value: string) {
        console.warn(
            "Property cancelAriaLabel is deprecated. Use i18n capabilities 'coreUploadCollection.menuCancelAriaLabel' key instead."
        );
        this._cancelAriaLabel = value;
    }

    get cancelAriaLabel(): string {
        return this._cancelAriaLabel;
    }

    /** @hidden */
    @ViewChild('okButton')
    _okButton: ButtonComponent;

    /** @hidden */
    private _cancelAriaLabel: string;

    /** @hidden */
    private _okAriaLabel: string;

    /** @hidden */
    private _deleteAriaLabel: string;

    /** @hidden */
    private _editAriaLabel: string;

    /** @hidden */
    private _cancelText: string;

    /** @hidden */
    private _okText: string;

    /** @hidden */
    _editButtonClicked(event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.editClicked.emit(true);
        this._editMode = true;
    }

    /** @hidden */
    _deleteButtonClicked(event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.deleteClicked.emit();
    }

    /** @hidden */
    _okButtonClicked(event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.okClicked.emit();
    }

    /** @hidden */
    _cancelButtonClicked(event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.editClicked.emit(false);
        this._editMode = false;
    }
}
