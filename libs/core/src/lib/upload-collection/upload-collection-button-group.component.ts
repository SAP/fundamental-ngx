import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-upload-collection-button-group',
    host: { class: 'fd-upload-collection__button-group' },
    template: `
        <button *ngIf="!editMode" (click)="editClicked()" fd-button fdType="transparent" glyph="edit" aria-label="edit"></button>
        <button *ngIf="!editMode" (click)="deleteClicked()" fd-button fdType="transparent" glyph="decline" aria-label="delete"></button>
        <button *ngIf="editMode" (click)="okClicked()" fd-button fdType="transparent" aria-label="ok">Ok</button>
        <button *ngIf="editMode" (click)="cancelClicked()" fd-button fdType="transparent" aria-label="cancel">Cancel</button>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadCollectionButtonGroupComponent {

    /** @hidden */
    editMode = false;

    /** Event emitted when the dragged file exits the dropzone. */
    @Output()
    readonly emitEditClicked = new EventEmitter<boolean>();

    /** @hidden */
    editClicked(): void {
        this.emitEditClicked.emit(true);
        this.editMode = true;
    }

    /** @hidden */
    deleteClicked(): void {

    }

    /** @hidden */
    okClicked(): void {

    }

    /** @hidden */
    cancelClicked(): void {
        this.emitEditClicked.emit(false);
        this.editMode = false;
    }

}
