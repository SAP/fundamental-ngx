import { UploadCollectionComponent } from '../upload-collection/upload-collection.component';
import { UploadCollectionFolder, UploadCollectionItem, UploadCollectionFile } from './upload-collection.models';

export interface NewFolderEvent {
    parentFolderId?: string | number;
    folder: UploadCollectionFolder;
}

export interface UploadCollectionNewItem {
    temporaryDocumentId: string | number;
    item: UploadCollectionItem;
}

export interface UploadEvent {
    parentFolderId?: string | number;
    items: UploadCollectionFile[];
}

export interface CancelUploadNewFileEvent {
    parentFolderId?: string | number;
    item: UploadCollectionFile;
}

// UpdateVersionEvent
export interface UpdateVersionEvent {
    parentFolderId?: string | number;
    item: UploadCollectionFile;
    newItem: File;
}

export interface DeleteEvent {
    parentFolderId?: string | number;
    items: UploadCollectionItem[];
}

export interface FileRenamedEvent {
    parentFolderId?: string | number;
    fileName: string;
    item: UploadCollectionItem;
}

export interface DownloadEvent {
    items: UploadCollectionFile[];
}

export interface MoveToEvent {
    from?: UploadCollectionFolder;
    to?: UploadCollectionFolder;
    items: UploadCollectionItem[];
    newFolder?: {
        parentFolderId: string | number | null;
        folderName: string;
    };
}

export interface FilenameLengthExceedEventPayload {
    items: (File | UploadCollectionItem)[];
}

export class FilenameLengthExceedEvent {
    /**
     * Filename length exceed event payload
     * @param source Upload Collection component
     * @param payload Files
     */
    constructor(public source: UploadCollectionComponent, public payload: FilenameLengthExceedEventPayload) {}
}

export interface TypeMismatchEventPayload {
    items: File[];
}

export class TypeMismatchEvent {
    /**
     * Type mismatch event
     * @param source Upload Collection component
     * @param payload Files
     */
    constructor(public source: UploadCollectionComponent, public payload: TypeMismatchEventPayload) {}
}

export interface FileSizeExceedEventPayload {
    items: File[];
}

export class FileSizeExceedEvent {
    /**
     * Filesize exceed event
     * @param source Upload Collection component
     * @param payload Files
     */
    constructor(public source: UploadCollectionComponent, public payload: FileSizeExceedEventPayload) {}
}

export type EventPayload =
    | NewFolderEvent
    | UploadEvent
    | UpdateVersionEvent
    | DeleteEvent
    | FileRenamedEvent
    | DownloadEvent
    | MoveToEvent
    | FileSizeExceedEventPayload
    | TypeMismatchEventPayload
    | FilenameLengthExceedEventPayload;
