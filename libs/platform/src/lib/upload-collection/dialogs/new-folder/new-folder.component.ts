import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { CdkScrollable } from '@angular/cdk/overlay';

import { FormsModule } from '@angular/forms';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef,
    DialogTitleDirective
} from '@fundamental-ngx/core/dialog';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { UploadCollectionFolder } from '../../models/upload-collection.models';

@Component({
    templateUrl: './new-folder.component.html',
    styles: [
        `
            .fd-title--bold {
                font-weight: bold;
            }
        `
    ],
    standalone: true,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TitleComponent,
        DialogTitleDirective,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        FormItemComponent,
        FormLabelComponent,
        FormsModule,
        FormControlComponent,
        ObjectStatusComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        FdTranslatePipe
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

    /** @hidden */
    constructor(public readonly dialogRef: DialogRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        const el = this.formControl.elementRef.nativeElement as HTMLInputElement;
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
