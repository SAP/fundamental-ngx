import { FormStates } from '@fundamental-ngx/cdk/forms';
import { EventEmitter } from '@angular/core';
import { TableRowSelectionChangeEvent } from '@fundamental-ngx/platform/table-helpers';

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

export class FilenameLengthExceedEvent<T extends UploadCollectionCmp = UploadCollectionCmp> {
    /**
     * Filename length exceed event payload
     * @param source Upload Collection component
     * @param payload Files
     */
    constructor(public source: T, public payload: FilenameLengthExceedEventPayload) {}
}

export interface TypeMismatchEventPayload {
    items: File[];
}

export class TypeMismatchEvent<T extends UploadCollectionCmp = UploadCollectionCmp> {
    /**
     * Type mismatch event
     * @param source Upload Collection component
     * @param payload Files
     */
    constructor(public source: T, public payload: TypeMismatchEventPayload) {}
}

export interface FileSizeExceedEventPayload {
    items: File[];
}

export class FileSizeExceedEvent<T extends UploadCollectionCmp = UploadCollectionCmp> {
    /**
     * Filesize exceed event
     * @param source Upload Collection component
     * @param payload Files
     */
    constructor(public source: T, public payload: FileSizeExceedEventPayload) {}
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

export interface FilesValidatorOutput {
    validFiles?: File[];
    typeMismatch?: File[];
    filenameLengthExceed?: File[];
    fileSizeExceed?: File[];
}

export interface FilesValidatorParams {
    maxFileSize?: string;
    maxFileNameLength?: number;
    fileTypes?: string[];
    mimeTypes?: string[];
}

export interface UploadCollectionCmp<T = any> {
    id: string;
    itemsPerPage: number | ItemPerPage[];
    dataSource: T;
    fileTypes: string[];
    maxFileSize?: string;
    maxFilenameLength?: number;
    mimeTypes: string[];
    noDataText: string;
    noDataDescription: string;
    disabled: boolean;
    readonly: boolean;
    hierarchy: boolean;
    enablePagination: boolean;
    terminationEnabled: boolean;
    multiple: boolean;
    showSearch: boolean;
    sameFileNameAllowed: boolean;
    typeMismatch: EventEmitter<TypeMismatchEvent>;
    filenameLengthExceed: EventEmitter<FilenameLengthExceedEvent>;
    fileSizeExceed: EventEmitter<FileSizeExceedEvent>;
    showMessage(type: MessageType, options: MessageOptions): void;
    _fileNameChange(e: FocusEvent, currentItem: UploadCollectionItem): void;
    _checkName(e: Event, currentItem: UploadCollectionItem): void;
    _openUploadFiles(): void;
    _openUpdateFileVersion(): void;
    _selectHandler(files: File[]): void;
    _handleDrop(output: FilesValidatorOutput): void;
    _openNewFolderDialog(): void;
    _moveToClicked(multiple?: boolean): void;
    _downloadClicked(multiple?: boolean): void;
    _remove(multiple?: boolean): void;
    _runUploadNewFileAfterFail(item: UploadCollectionFile): void;
    _cancelUploadNewFile(file: UploadCollectionFile): void;
    _messageStripDismiss(): void;
    _openFolder(item: UploadCollectionItem): void;
    _actionButton(item: UploadCollectionItem): void;
    _onDropzone(event: boolean): void;
    _dragDropCancel(): void;
    _breadcrumbGoTo(event: MouseEvent, index?: number): void;
    _pageChanged(pageNumber: number): void;
    _itemsPerPageChange(value: number): void;
    _searchInputChanged(): void;
    _onRowSelectionChange(data: TableRowSelectionChangeEvent<UploadCollectionItem>): void;
    _getItemName(item: UploadCollectionItem): string;
    _getItemExtension(item: UploadCollectionItem): string;
    _getIconByType(file: UploadCollectionFile): string;
    _showIfSelectedOnlyFiles(): boolean;
    _isSelectedItem(item: UploadCollectionItem): boolean;
    _getList(): UploadCollectionItem[];
    _trackByDocumentId(index: number, item: UploadCollectionItem): UploadCollectionItem['documentId'];
    _getAllowedTypes(): string;
}
