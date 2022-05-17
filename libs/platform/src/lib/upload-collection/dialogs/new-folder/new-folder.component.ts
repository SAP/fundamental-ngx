import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { DialogRef } from '@fundamental-ngx/core/dialog';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { UploadCollectionFolder } from '../../models/upload-collection.models';

@Component({
    templateUrl: './new-folder.component.html',
    styles: [
        `
            .fd-title--bold {
                font-weight: bold;
            }
        `
    ]
})
export class NewFolderComponent implements AfterViewInit {
    /**
     * @hidden
     * The current folder in what need to create a new one
     */
    readonly _currentFolder?: UploadCollectionFolder = this.dialogRef.data.currentFolder;

    /** @hidden */
    readonly _maxFilenameLength = this.dialogRef.data.maxFilenameLength;

    /** @hidden */
    _newFolderName = 'New Folder';

    /** @hidden */
    @ViewChild(FormControlComponent)
    private readonly formControl: FormControlComponent;

    constructor(public readonly dialogRef: DialogRef) {}

    ngAfterViewInit(): void {
        const el = this.formControl.elementRef().nativeElement as HTMLInputElement;
        if (el) {
            el.focus();
            this._setSelectionRange(el, 0, this._newFolderName.length);
        }
    }

    /** @hidden */
    private _setSelectionRange(el: HTMLInputElement, selectionStart: number, selectionEnd: number): void {
        const direction = el.selectionDirection;

        el.setSelectionRange(selectionStart, selectionEnd, direction || undefined);
    }
}
