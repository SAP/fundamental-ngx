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
import deprecated from 'deprecated-decorator';

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
    @deprecated("i18n capabilities 'coreUploadCollection.menuOkText' key")
    okText: string;

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Cancel' button.
     */
    @Input()
    @deprecated("i18n capabilities 'coreUploadCollection.menuCancelText' key")
    cancelText: string;

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Edit' aria-label.
     */
    @Input()
    @deprecated("i18n capabilities 'coreUploadCollection.menuEditAriaLabel' key")
    editAriaLabel: string;

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Delete' aria-label.
     */
    @Input()
    @deprecated("i18n capabilities 'coreUploadCollection.menuDeleteAriaLabel' key")
    deleteAriaLabel: string;

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Ok' aria-label.
     */
    @Input()
    @deprecated("i18n capabilities 'coreUploadCollection.menuOkAriaLabel' key")
    okAriaLabel: string;

    /**
     * @deprecated use i18n capabilities instead
     * Text for the 'Cancel' aria-label.
     */
    @Input()
    @deprecated("i18n capabilities 'coreUploadCollection.menuCancelAriaLabel' key")
    cancelAriaLabel: string;

    /** @hidden */
    @ViewChild('okButton')
    _okButton: ButtonComponent;

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
