import { HttpClient } from '@angular/common/http';
import { merge, Observable, of, Subject } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';

import { uuidv4 } from '@fundamental-ngx/core/utils';
import {
    CancelUploadNewFileEvent,
    DeleteEvent,
    DownloadEvent,
    FileRenamedEvent,
    MoveToEvent,
    NewFolderEvent,
    UpdateVersionEvent,
    UploadCollectionDataProvider,
    UploadCollectionFile,
    UploadCollectionFolder,
    UploadCollectionItem,
    UploadCollectionItemStatus,
    UploadCollectionNewItem,
    UploadEvent
} from '@fundamental-ngx/platform/upload-collection';

import { generateUploadCollectionItems } from './platform-upload-collection-items-generator';

enum CancelActiveRequest {
    UPDATE,
    NEW_FOLDER,
    UPDATE_VERSION
}

export class PlatformUploadCollectionDataProviderExample extends UploadCollectionDataProvider {
    items: UploadCollectionItem[] = generateUploadCollectionItems(50, 4, 2);
    private _cancelUploadNewFileIds: (string | number)[] = [];
    private _activeRequest: CancelActiveRequest | null = null;

    constructor(private readonly _http: HttpClient) {
        super();
    }

    /** The method is triggered when valid files are selected in the file uploader dialog. */
    upload({ parentFolderId, items }: UploadEvent): Observable<UploadCollectionItem[]> {
        console.log('upload', parentFolderId, items);

        this._activeRequest = CancelActiveRequest.UPDATE;

        return of(this.items).pipe(
            delay(5000),
            tap(() => {
                const newFiles: UploadCollectionNewItem[] = items.map((item) => {
                    delete item.file;
                    item.status = UploadCollectionItemStatus.SUCCESSFUL;

                    return {
                        temporaryDocumentId: item.documentId,
                        item
                    };
                });

                this._findParentFolderAndAddNewFiles(parentFolderId, newFiles);
                this._activeRequest = null;
            })
        );
    }

    /** The method is triggered when an uploaded attachment is selected and the Download button is pressed. */
    download(data: DownloadEvent): Observable<void> {
        console.log('download', data);

        const obs = data.items.map((file) =>
            this._http.get(file.url, { responseType: 'blob' }).pipe(
                map((blob) => ({
                    blob,
                    file
                }))
            )
        );

        return merge(...obs).pipe(
            map(({ file, blob }) => {
                const a = document.createElement('a');
                const objectUrl = URL.createObjectURL(blob);
                a.href = objectUrl;
                a.download = file.name;
                a.click();
                URL.revokeObjectURL(objectUrl);

                return;
            })
        );
    }

    /**
     * The method is triggered when Move to button is pressed and folder to move is selected in the dialog modal.
     * Should return full dataSource
     * */
    moveTo({ from, to, items, newFolder }: MoveToEvent): Observable<UploadCollectionItem[]> {
        console.log('moveTo', from, to, items, newFolder);

        const ids = items.map((item) => item.documentId as string);

        this._findParentFolderAndRemoveItemsByIds(from ? from.documentId : null, ids);
        if (newFolder) {
            const folder = this._generateNewFolder(newFolder.folderName);

            this._findParentFolderAndAddFiles(newFolder.parentFolderId, [folder]);
            this._findParentFolderAndAddFiles(folder.documentId!, items);
        } else {
            this._findParentFolderAndAddFiles(to ? to.documentId! : null, items);
        }

        return of(this.items);
    }

    /** The method is triggered when an uploaded attachment is selected and the Delete button is pressed. */
    delete({ parentFolderId, items }: DeleteEvent): Observable<UploadCollectionItem[]> {
        console.log('delete', parentFolderId, items);

        const ids = items.map((item) => item.documentId as string);
        this._findParentFolderAndRemoveItemsByIds(parentFolderId, ids);

        return of(this.items);
    }

    /** The method is triggered when the file name is changed. */
    fileRenamed({ parentFolderId, item, fileName }: FileRenamedEvent): Observable<UploadCollectionItem[]> {
        console.log('fileRenamed', parentFolderId, item, fileName);
        const updatedItem = {
            ...item,
            name: fileName
        };

        this._findParentFolderAndUpdateItem(parentFolderId, updatedItem);

        return of(this.items).pipe(delay(5000));
    }

    /** The method is triggered when the new folder added. */
    newFolder({ parentFolderId, folder }: NewFolderEvent): Observable<UploadCollectionItem[]> {
        console.log('newFolder', folder, parentFolderId);

        this._activeRequest = CancelActiveRequest.NEW_FOLDER;
        const complete = new Subject<void>();

        return of(this.items).pipe(
            delay(5000),
            tap(() => {
                const folderId = folder.documentId as string;
                const includes = this._cancelUploadNewFileIds.includes(folderId);

                if (includes) {
                    this._cancelUploadNewFileIds = this._cancelUploadNewFileIds.filter((id) => id !== folderId);
                    this._activeRequest = null;
                    complete.next();
                }
            }),
            takeUntil(complete),
            tap(() => {
                const uploadedFile = {
                    temporaryDocumentId: folder.documentId as string,
                    item: {
                        ...folder,
                        status: UploadCollectionItemStatus.SUCCESSFUL
                    }
                };

                this._findParentFolderAndAddNewFiles(parentFolderId, [uploadedFile]);
                this._activeRequest = null;
            })
        );
    }

    /** The method is triggered when Update Version button is pressed and valid file are selected in the file uploader dialog. */
    updateVersion({ parentFolderId, item, newItem }: UpdateVersionEvent): Observable<UploadCollectionItem[]> {
        console.log('updateVersion', parentFolderId, item);

        this._activeRequest = CancelActiveRequest.UPDATE_VERSION;
        const complete = new Subject();

        return of(this.items).pipe(
            delay(5000),
            tap(() => {
                const itemId = item.documentId;
                const includes = this._cancelUploadNewFileIds.includes(itemId);
                if (includes) {
                    this._cancelUploadNewFileIds = this._cancelUploadNewFileIds.filter((id) => id !== itemId);
                    this._activeRequest = null;
                    complete.next(true);
                }
            }),
            tap(() => {
                const updatedItem: UploadCollectionFile = {
                    ...item,
                    status: UploadCollectionItemStatus.SUCCESSFUL,
                    uploadedOn: new Date(),
                    uploadedBy: {
                        id: Date.now(),
                        name: 'You'
                    },
                    version: +item.version,
                    name: newItem.name,
                    fileSize: newItem.size
                };

                this._findParentFolderAndUpdateItem(parentFolderId, updatedItem);
                this._activeRequest = null;
            }),
            takeUntil(complete)
        );
    }

    runAfterFail({ parentFolderId, items }: UploadEvent): Observable<UploadCollectionItem[]> {
        console.log('runAfterFail', parentFolderId, items);
        const item = items[0];

        this._findParentFolderAndAddNewFiles(parentFolderId, [
            {
                temporaryDocumentId: item.documentId,
                item: {
                    ...item,
                    status: UploadCollectionItemStatus.SUCCESSFUL
                }
            }
        ]);

        return of(this.items);
    }

    /** The method is triggered when Cancel button is pressed */
    cancelUploadNewFile({ parentFolderId, item }: CancelUploadNewFileEvent): Observable<UploadCollectionItem[]> {
        console.log('cancelUploadNewFile', parentFolderId, item);
        const id = item.documentId;
        this._cancelUploadNewFileIds.push(id);

        if (this._activeRequest === CancelActiveRequest.NEW_FOLDER) {
            this._findParentFolderAndRemoveItemsByIds(parentFolderId, [id]);
        }

        if (this._activeRequest === CancelActiveRequest.UPDATE) {
            this._findParentFolderAndRemoveItemsByIds(parentFolderId, [id]);
        }

        if (this._activeRequest === CancelActiveRequest.UPDATE_VERSION) {
            delete item.status;
            this._findParentFolderAndUpdateItem(parentFolderId, item);
        }

        return of([]);
    }

    /** @hidden */
    private _findParentFolderAndUpdateItem(
        parentFolderId: string | number | null | undefined,
        updatedItem: UploadCollectionItem,
        items = this.items
    ): void {
        if (!parentFolderId) {
            const index = items.findIndex((item) => item.documentId === updatedItem.documentId);
            if (index !== -1) {
                items[index] = updatedItem;
            }

            return;
        }

        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i];

            if (currentItem.type !== 'folder') {
                continue;
            }

            if (currentItem.documentId === parentFolderId) {
                const index = currentItem.files.findIndex((item) => item.documentId === updatedItem.documentId);
                if (index !== -1) {
                    currentItem.files[i] = updatedItem;

                    break;
                }
            } else {
                this._findParentFolderAndUpdateItem(parentFolderId, updatedItem, currentItem.files);
            }
        }
    }

    /** @hidden */
    private _findParentFolderAndAddNewFiles(
        parentFolderId: string | number | null | undefined,
        uploadedFiles: UploadCollectionNewItem[],
        items = this.items
    ): void {
        if (uploadedFiles.length === 0) {
            return;
        }

        if (!parentFolderId) {
            const uploadedFile = uploadedFiles.pop()!;
            const index = items.findIndex((item) => item.documentId === uploadedFile.temporaryDocumentId);
            if (index !== -1) {
                items[index] = uploadedFile.item;
            }

            if (uploadedFiles.length > 0) {
                this._findParentFolderAndAddNewFiles(parentFolderId, uploadedFiles);
            }

            return;
        }

        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i];
            if (currentItem.type !== 'folder') {
                continue;
            }

            if (currentItem.documentId === parentFolderId) {
                const hash = uploadedFiles.reduce((res, file) => {
                    res[file.temporaryDocumentId] = file.item;
                    return res;
                }, {});

                currentItem.files = currentItem.files.map((item) =>
                    item.documentId && hash[item.documentId] ? hash[item.documentId] : item
                );

                break;
            } else {
                this._findParentFolderAndAddNewFiles(parentFolderId, uploadedFiles, currentItem.files);
            }
        }
    }

    /** @hidden */
    private _findParentFolderAndAddFiles(
        parentFolderId: string | number | null,
        files: UploadCollectionItem[],
        items = this.items
    ): void {
        if (files.length === 0) {
            return;
        }

        if (!parentFolderId) {
            items.push(...files);

            return;
        }

        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i];
            if (currentItem.type !== 'folder') {
                continue;
            }

            if (currentItem.documentId === parentFolderId) {
                currentItem.files.push(...files);

                break;
            } else {
                this._findParentFolderAndAddFiles(parentFolderId, files, currentItem.files);
            }
        }
    }

    /** @hidden */
    private _findParentFolderAndRemoveItemsByIds(
        parentFolderId: string | number | null | undefined,
        documentsIds: (number | string)[],
        items = this.items
    ): void {
        if (documentsIds.length === 0) {
            return;
        }

        if (!parentFolderId) {
            const documentId = documentsIds.pop();
            const index = items.findIndex((item) => item.documentId === documentId);
            if (index !== -1) {
                items.splice(index, 1);
                this._findParentFolderAndRemoveItemsByIds(parentFolderId, documentsIds);
            }

            return;
        }

        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i];
            if (currentItem.type !== 'folder') {
                continue;
            }

            if (currentItem.documentId === parentFolderId) {
                currentItem.files = currentItem.files.filter(
                    (item) => !documentsIds.some((documentId) => documentId === item.documentId)
                );

                break;
            } else {
                this._findParentFolderAndRemoveItemsByIds(parentFolderId, documentsIds, currentItem.files);
            }
        }
    }

    /** @hidden */
    private _generateNewFolder(folderName: string): UploadCollectionFolder {
        return {
            documentId: uuidv4(),
            type: 'folder',
            name: folderName,
            uploadedBy: {
                id: uuidv4(),
                name: 'You'
            },
            uploadedOn: new Date(),
            files: [],
            status: UploadCollectionItemStatus.SUCCESSFUL
        };
    }
}
