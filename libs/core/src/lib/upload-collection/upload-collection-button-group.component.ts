import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-upload-collection-button-group',
    host: { class: 'fd-upload-collection__button-group' },
    templateUrl: './upload-collection-button-group.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadCollectionButtonGroupComponent {
    /** @hidden */
    editMode = false;

    /** @hidden */
    okDisabled = false;

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

    /** Text for the 'Ok' button. */
    @Input()
    okText = 'Ok';

    /** Text for the 'Cancel' button. */
    @Input()
    cancelText = 'Cancel';

    /** @hidden */
    editButtonClicked(): void {
        this.editClicked.emit(true);
        this.editMode = true;
    }

    /** @hidden */
    deleteButtonClicked(): void {
        this.deleteClicked.emit();
    }

    /** @hidden */
    okButtonClicked(): void {
        this.okClicked.emit();
    }

    /** @hidden */
    cancelButtonClicked(): void {
        this.editClicked.emit(false);
        this.editMode = false;
    }
}
