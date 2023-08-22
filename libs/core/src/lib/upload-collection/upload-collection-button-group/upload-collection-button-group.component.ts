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
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'fd-upload-collection-button-group',
    host: { class: 'fd-upload-collection__button-group' },
    templateUrl: './upload-collection-button-group.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, ButtonModule, FdTranslatePipe]
})
export class UploadCollectionButtonGroupComponent {
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

    /** @hidden */
    @ViewChild('okButton')
    _okButton: ButtonComponent;

    /** @hidden */
    _editMode = false;

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
