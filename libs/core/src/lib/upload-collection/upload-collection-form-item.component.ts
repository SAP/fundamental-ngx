import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-upload-collection-form-item',
    host: { class: 'fd-upload-collection__form-item' },
    template: `
        <a href="#" *ngIf="!editMode" fd-link fd-list-title fd-upload-collection-title>File_Name.extension</a>
        <input *ngIf="editMode" class="fd-input" type="text" placeholder="Filename">
        <span *ngIf="editMode" class="fd-upload-collection__extension">.jpg</span>
    `,
    encapsulation: ViewEncapsulation.None
})
export class UploadCollectionFormItemComponent {

    /** @hidden */
    editMode = false;

}
