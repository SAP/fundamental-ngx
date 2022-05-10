import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { DialogRef, DialogService, DialogConfig } from '@fundamental-ngx/core/dialog';
import { isObject } from '@fundamental-ngx/platform/shared';
import { ContentDensityEnum } from '@fundamental-ngx/core/utils';

import { UploadCollectionItem, UploadCollectionFolder } from '../../models/upload-collection.models';
import { NewFolderComponent } from '../new-folder/new-folder.component';

export interface MoveToComponentDialogData {
    items: UploadCollectionItem[];
    contentDensity: ContentDensityEnum;
    currentFolder?: UploadCollectionFolder;
    movableFolders?: UploadCollectionFolder[];
    maxFilenameLength: number;
}

@Component({
    templateUrl: './move-to.component.html',
    styles: [
        `
            .fd-list__item--title-background {
                background-color: #f2f2f2;
                background-color: var(--sapList_HeaderBackground);
            }

            .fd-dialog__body--no-horizontal-padding {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .fd-title--bold {
                font-weight: bold;
            }
        `
    ]
})
export class MoveToComponent implements OnInit {
    /**
     * List of upload collection items
     */
    readonly items: UploadCollectionItem[] = this.dialogRef.data.items;
    /**
     * The current folder in what need to create a new one
     */
    originalFolder?: UploadCollectionFolder = this.dialogRef.data.currentFolder;

    /** @hidden */
    readonly movableFolders?: UploadCollectionFolder[] = this.dialogRef.data.movableFolders;

    /** @hidden */
    readonly _maxFilenameLength = this.dialogRef.data.maxFilenameLength;

    /** @hidden */
    _currentFolder?: UploadCollectionFolder = this.originalFolder && { ...this.originalFolder };
    /** @hidden */
    selectedFolder: UploadCollectionFolder | null;

    /** @hidden */
    _foldersList: UploadCollectionFolder[] = [];

    constructor(
        public readonly dialogRef: DialogRef<MoveToComponentDialogData>,
        private readonly _dialogService: DialogService,
        private readonly _cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this._init(this._currentFolder ? this._currentFolder.files : this.items);
    }

    /** @hidden */
    _goToParentFolder(): void {
        this.selectedFolder = null;
        this._currentFolder = this._getParentFolderByCurrentFolderId(this._currentFolder?.documentId);
        this._init(this._currentFolder ? this._currentFolder.files : this.items);

        this._cd.detectChanges();
    }

    /** @hidden */
    _close(): void {
        this.dialogRef.dismiss();
    }

    /** @hidden */
    _confirm(): void {
        this.dialogRef.close({
            selectedFolder: this.selectedFolder || this._currentFolder
        });
    }

    /** @hidden */
    _openFolder(folder: UploadCollectionFolder): void {
        this.selectedFolder = null;
        this._currentFolder = folder;
        this._init(folder.files);

        this._cd.detectChanges();
    }

    /** @hidden */
    _selectFolder(folder: UploadCollectionFolder): void {
        this.selectedFolder = folder;
    }

    /** @hidden */
    _hasFolders(items: UploadCollectionItem[]): boolean {
        return items.some((item) => item.type === 'folder');
    }

    /** @hidden */
    _newFolder(): void {
        const dialogRef = this._dialogService.open(NewFolderComponent, {
            responsivePadding: true,
            backdropClickCloseable: false,
            height: '350px',
            backdropClass: 'fdp-upload-collection-dialig-no-bg',
            data: {
                currentFolder: this._currentFolder,
                maxFilenameLength: this._maxFilenameLength
            }
        } as DialogConfig);

        dialogRef.afterClosed.pipe(take(1)).subscribe((folderName) => {
            this.dialogRef.close({
                parentFolderId: this._currentFolder?.documentId,
                selectedFolder: null,
                folderName
            });
        });
    }

    /** @hidden */
    private _init(items: UploadCollectionItem[]): void {
        this._foldersList = items.filter(
            (item) =>
                item.type === 'folder' && !this.movableFolders?.some((folder) => folder.documentId === item.documentId)
        ) as UploadCollectionFolder[];
    }

    /** @hidden */
    private _getParentFolderByCurrentFolderId(documentId?: string | number): UploadCollectionFolder | undefined {
        let foundObj: UploadCollectionFolder | undefined;

        if (documentId) {
            JSON.stringify(this.items, (_, nestedValue) => {
                if (!isObject(nestedValue) || nestedValue.type === 'file' || !nestedValue.files) {
                    return nestedValue;
                }

                if (nestedValue.files.some((item) => item.documentId === documentId)) {
                    foundObj = nestedValue;
                }

                return nestedValue;
            });
        }

        return foundObj;
    }
}
