import { Component, Inject, OnInit } from '@angular/core';

import { DIALOG_REF, DialogRef, DialogService, DialogConfig } from '@fundamental-ngx/core';
import { take } from 'rxjs/operators';

import { UploadCollectionItem, UploadCollectionFolder } from '../../models/upload-collection.models';
import { NewFolderComponent } from '../new-folder';

function isObject<T>(item: T): boolean {
    return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

@Component({
    templateUrl: './move-to.component.html',
    styles: [
        `
            .fd-list__item--title-background {
                background: #f2f2f2;
            }

            .fd-dialog__body--no-horizontal-padding {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
        `
    ]
})
export class MoveToComponent implements OnInit {
    readonly _items: UploadCollectionItem[] = this.dialogRef.data.items;
    _foldersList: UploadCollectionFolder[] = [];
    _originalFolder?: UploadCollectionFolder = this.dialogRef.data.currentFolder;
    _currentFolder?: UploadCollectionFolder = this._originalFolder ? { ...this._originalFolder } : null;
    selectedFolder?: UploadCollectionFolder;

    constructor(
        @Inject(DIALOG_REF) private readonly dialogRef: DialogRef,
        private readonly _dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this._init(this._currentFolder ? this._currentFolder.files : this._items);
    }

    goToParentFolder(): void {
        this.selectedFolder = null;
        this._currentFolder = this._getParentFolderByCurrentFolderId(this._currentFolder.documentId);
        this._init(this._currentFolder ? this._currentFolder.files : this._items);
    }

    close(): void {
        this.dialogRef.dismiss();
    }

    confirm(): void {
        this.dialogRef.close({
            selectedFolder: this.selectedFolder || this._currentFolder
        });
    }

    openFolder(folder: UploadCollectionFolder): void {
        this.selectedFolder = null;
        this._currentFolder = folder;
        this._init(folder.files);
    }

    selectFolder(folder: UploadCollectionFolder): void {
        this.selectedFolder = folder;
    }

    hasFolders(items: UploadCollectionItem[]): boolean {
        return items.some((item) => item.type === 'folder');
    }

    newFolder(): void {
        const dialogRef = this._dialogService.open(NewFolderComponent, {
            responsivePadding: true,
            backdropClickCloseable: false,
            height: '70%',
            backdropClass: 'fdp-upload-collection-dialig-no-bg',
            data: {
                currentFolder: this._currentFolder
            }
        } as DialogConfig);

        dialogRef.afterClosed.pipe(take(1)).subscribe((folderName) => {
            const folder: UploadCollectionFolder = {
                documentId: null,
                type: 'folder',
                name: folderName,
                uploadedBy: {
                    id: Date.now(),
                    name: 'You'
                },
                uploadedOn: new Date(),
                files: []
            };

            this.dialogRef.close({
                selectedFolder: folder
            });
        });
    }

    private _init(items: UploadCollectionItem[]): void {
        this._foldersList = items.filter((item) => item.type === 'folder') as UploadCollectionFolder[];
    }

    private _getParentFolderByCurrentFolderId(documentId: string | number): UploadCollectionFolder | undefined {
        let foundObj: UploadCollectionFolder;

        JSON.stringify(this._items, (_, nestedValue) => {
            if (!isObject(nestedValue) || nestedValue.type === 'file' || !nestedValue.files) {
                return nestedValue;
            }

            if (nestedValue.files.some((item) => item.documentId === documentId)) {
                foundObj = nestedValue;
            }

            return nestedValue;
        });

        return foundObj;
    }
}
