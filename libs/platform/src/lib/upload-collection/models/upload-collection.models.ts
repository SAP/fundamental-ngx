import { FormStates } from '@fundamental-ngx/core/shared';
import { EventPayload } from './upload-collection-events.models';

export enum UploadCollectionItemStatus {
    LOADING = 'loading',
    SUCCESSFUL = 'successful',
    UNSUCCESSFUL = 'unsuccessful'
}

export interface Author {
    id: number | string;
    name: string;
}

export interface UploadCollectionFolder {
    documentId?: number | string;
    type: 'folder';
    name: string;
    uploadedBy: Author;
    uploadedOn: Date;
    fileSize?: number;
    files: UploadCollectionItem[];
    status?: UploadCollectionItemStatus;
    sameFilenameState?: FormStates;
}

export interface UploadCollectionFile {
    documentId: number | string;
    type: 'file';
    name: string;
    uploadedBy: Author;
    uploadedOn: Date;
    fileSize: number;
    version: number;
    url: string;
    status?: UploadCollectionItemStatus;
    file?: File;
    sameFilenameState?: FormStates;
}

export interface ItemPerPage {
    label: number;
    default: boolean;
}

export type UploadCollectionItem = UploadCollectionFile | UploadCollectionFolder;

export enum MessageStripType {
    WARNING = 'warning',
    SUCCESS = 'success',
    INFORMATION = 'information',
    ERROR = 'error'
}

export interface Message {
    messageType: MessageType;
    messageStripType: MessageStripType;
    payload: EventPayload;
    count?: MessageItemsCount;
}

export interface MessageItemsCount {
    file: number;
    folder: number;
}

export enum MessageType {
    CREATE,
    REMOVE,
    MOVE,
    UPDATE_VERSION,
    FILE_RENAME,
    TYPE_MISMATCH,
    FILE_NAME_LENGTH,
    FILE_SIZE
}

export interface MessageOptions {
    type: MessageStripType;
    payload: EventPayload;
}

export interface BreadcrumbList {
    folderId: number | string;
    folderName: string;
    clikable: boolean;
}

export interface GroupByType {
    files: UploadCollectionFile[];
    folders: UploadCollectionFolder[];
}
