import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { uuidv4 } from '@fundamental-ngx/cdk/utils';
import { DialogConfig, DialogService } from '@fundamental-ngx/core/dialog';
import { ColumnAlign, SelectionMode, TableRowSelectionChangeEvent } from '@fundamental-ngx/platform/table';
import { isDataSource } from '@fundamental-ngx/platform/shared';
import { NewFolderComponent } from '../dialogs/new-folder/new-folder.component';
import { MoveToComponent, MoveToComponentDialogData } from '../dialogs/move-to/move-to.component';
import { FilesValidatorService } from '../services/files-validator.service';
import {
    BreadcrumbList,
    ItemPerPage,
    Message,
    MessageOptions,
    MessageStripType,
    MessageType,
    UploadCollectionFile,
    UploadCollectionFolder,
    UploadCollectionItem,
    UploadCollectionItemStatus,
    FilenameLengthExceedEvent,
    FileSizeExceedEvent,
    MoveToEvent,
    TypeMismatchEvent,
    UpdateVersionEvent,
    FilesValidatorOutput,
    UploadCollectionCmp
} from '../models/upload-collection.models';
import { generateMessageStripeData } from '../helpers/generate-message-stripe-data';
import { UploadCollectionDataSource } from '../domain/upload-collection-data-source';

export type FdpUploadCollectionDataSource = UploadCollectionDataSource;

let randomId = 0;

/**
 * @deprecated
 * UploadCollection component is depricated since version 0.40.0
 */
@Component({
    selector: 'fdp-upload-collection',
    templateUrl: './upload-collection.component.html',
    styleUrls: ['./upload-collection.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UploadCollectionComponent
    implements OnChanges, OnDestroy, UploadCollectionCmp<FdpUploadCollectionDataSource>
{
    /** ID of the upload collection element. If none is provided, one will be generated. */
    @Input()
    id = `fdp-upload-collection-id-${randomId++}`;

    /** Defines the number of items on the page */
    @Input()
    set itemsPerPage(value: number | ItemPerPage[]) {
        if (typeof value === 'number') {
            this._itemsPerPage = value;
            this._match();

            return;
        }

        const defaultValue = value.find((item) => item.default);
        this._itemsPerPageOptions = value;

        if (defaultValue) {
            this._itemsPerPage = defaultValue.label;
            this._match();

            return;
        }

        this._itemsPerPage = value[Math.round(value.length / 2)].label;

        this._match();
    }
    get itemsPerPage(): number | ItemPerPage[] {
        return this._itemsPerPage;
    }

    /** List of items */
    @Input()
    set dataSource(value: FdpUploadCollectionDataSource) {
        if (value) {
            this._initializeDS(value);
        }
    }
    get dataSource(): FdpUploadCollectionDataSource {
        return this._dataSource;
    }

    /**
     * Defines the allowed file types for the upload.
     * The chosen files will be checked against an array of file types.
     * If at least one file does not fit the file type requirements,
     * the upload is prevented. Example: ["jpg", "png", "bmp"].
     */
    @Input()
    fileTypes: string[] = [];

    /**
     * Specifies a file size limit in megabytes that prevents the upload
     * if at least one file exceeds the limit.
     */
    @Input()
    maxFileSize?: string;

    /**
     * Specifies the maximum length of a file name.
     * If the maximum file name length is exceeded,
     * the corresponding event 'filenameLengthExceed' is triggered.
     */
    @Input()
    maxFilenameLength?: number;

    /**
     * Defines the allowed MIME types of files to be uploaded.
     * The chosen files will be checked against an array of MIME types.
     * If at least one file does not fit the MIME type requirements, the upload is prevented.
     * Example: mimeTypes ["image/png", "image/jpeg"].
     */
    @Input()
    mimeTypes: string[] = [];

    /**
     * @deprecated use i18n capabilities instead
     * Allows to set own text for the 'No data' text label.
     */
    @Input()
    noDataText: string;

    /**
     * @deprecated use i18n capabilities instead
     * Allows to set own text for the 'No data' description label.
     */
    @Input()
    noDataDescription: string;

    /** All action buttons will be disabled */
    @Input()
    disabled = false;

    /** All action buttons will be invisible */
    @Input()
    readonly = false;

    /** Allows to support hierarchy */
    @Input()
    hierarchy = true;

    /** Allows to show/hide pagination */
    @Input()
    enablePagination = true;

    /**
     * If true, the button that is used to terminate the instant file upload gets visible.
     * The button normally appears when a file is being uploaded.
     */
    @Input()
    terminationEnabled = true;

    /** Gives to select multiple files from the same folder and then upload them. */
    @Input()
    multiple = true;

    /** Allows to show/hide search */
    @Input()
    showSearch = true;

    /**
     * Allows to use the same name for a file when editing the file name.
     * 'Same name' refers to an already existing file name in the list.
     * */
    @Input()
    sameFileNameAllowed = false;

    /**
     * The event is triggered when the file type or the MIME type don't match the permitted types
     * (only if the fileTypes property or the mimeTypes property are provided by the application).
     */
    @Output()
    typeMismatch = new EventEmitter<TypeMismatchEvent>();

    /**
     * The event is triggered when the name of a chosen file is longer than the value specified
     * with the maxFilenameLength property (only if provided by the application).
     */
    @Output()
    filenameLengthExceed = new EventEmitter<FilenameLengthExceedEvent>();

    /**
     * The event is triggered when the file size of an uploaded file is exceeded
     * (only if the maxFileSize property was provided by the application).
     */
    @Output()
    fileSizeExceed = new EventEmitter<FileSizeExceedEvent>();

    /** @hidden */
    _uploadCollectionItemStatus = UploadCollectionItemStatus;

    /** @hidden */
    _breadcrumbList: BreadcrumbList[] = [];

    /** @hidden */
    _currentPage = 1;

    /** @hidden */
    _itemsPerPage = 10;

    /** @hidden */
    _itemsPerPageOptions: ItemPerPage[] = [];

    /** @hidden */
    _totalItems = 0;

    /** @hidden */
    _countShowedItems = 0;

    /** @hidden */
    _countNotShowedItems = 0;

    /** @hidden
     * List of currently displayed items
     */
    _visibleList$ = new BehaviorSubject<UploadCollectionItem[]>([]);

    /** @hidden */
    selectedItems: UploadCollectionItem[] = [];

    /** @hidden */
    _searchText = '';

    /** @hidden */
    _showDragDropArea = false;

    /** @hidden */
    _onDragDropArea = false;

    /** @hidden */
    _activeItem?: UploadCollectionItem;

    /** @hidden */
    _currentUpdateFileVersion?: UploadCollectionFile;

    /** @hidden */
    _message?: Message;

    /** @hidden */
    _messageType = MessageType;

    /** @hidden */
    _messageStripType = MessageStripType;

    /** @hidden */
    _columnAlign = ColumnAlign;

    /** @hidden */
    _selectionMode = SelectionMode;

    /** @hidden */
    private _dataSource: UploadCollectionDataSource;

    /** @hidden */
    private _contentDensityManuallySet = false;

    /** @hidden */
    @ViewChild('fileInput')
    private readonly _uploadFilesRef: ElementRef;

    /** @hidden */
    @ViewChild('updateVersionInput')
    private readonly _updateVersionRef: ElementRef;

    /** @hidden */
    private readonly _imageExtensions: string[] = [
        '.apng',
        '.bmp',
        '.gif',
        '.ico',
        '.cur',
        '.jpg',
        '.jpeg',
        '.jfif',
        '.pjpeg',
        '.pjp',
        '.png',
        '.svg',
        '.tif',
        '.tiff',
        '.webp',
        '.flif',
        '.cr2',
        '.jxr',
        '.psd',
        '.bpg',
        '.jp2',
        '.jpm',
        '.jpx',
        '.heic',
        '.dcm'
    ];

    /** @hidden */
    private _validatedFiles: FilesValidatorOutput;

    /** @hidden for data source handling */
    private _dsSubscription?: Subscription;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(
        private readonly _dialogService: DialogService,
        private readonly _filesValidatorService: FilesValidatorService,
        private readonly _cdr: ChangeDetectorRef,
        private _injector: Injector
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.contentDensity) {
            this._contentDensityManuallySet = true;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this._dsSubscription?.unsubscribe();
        this.dataSource.close();
    }

    /** Show meessage for types NEW FOLDER CREATE, REMOVE, MOVE TO, UPDATE_VERSION, FILE_RENAMED */
    showMessage(type: MessageType, options: MessageOptions): void {
        this._message = generateMessageStripeData(type, options);
    }

    /**
     * @hidden
     * Opens the file selector.
     */
    _fileNameChange(e: FocusEvent, currentItem: UploadCollectionItem): void {
        const input = e.target as HTMLInputElement;
        const itemName = input.value.trim();
        const newName = currentItem.type === 'file' ? `${itemName}.${currentItem.name.split('.').pop()}` : itemName;

        if (currentItem.name === newName) {
            return;
        }

        if (this.maxFilenameLength && itemName.length > this.maxFilenameLength) {
            const renamedItem = {
                ...currentItem,
                name: newName
            };
            const payload = {
                items: [renamedItem]
            };
            const filenameLengthEvent = new FilenameLengthExceedEvent(this, payload);

            this.showMessage(MessageType.FILE_NAME_LENGTH, { payload, type: MessageStripType.ERROR });

            this.filenameLengthExceed.emit(filenameLengthEvent);

            return;
        }

        if (currentItem.sameFilenameState) {
            return;
        }

        const data = {
            parentFolderId: this._getCurrentFolderId(),
            fileName: newName,
            item: { ...currentItem }
        };

        this.dataSource
            .fileRenamed(data)
            .pipe(
                tap(() => {
                    this.selectedItems = [];

                    this._match();
                })
            )
            .subscribe({
                next: () => {
                    this.showMessage(MessageType.FILE_RENAME, {
                        payload: data,
                        type: MessageStripType.SUCCESS
                    });
                },
                error: () => {
                    this.showMessage(MessageType.FILE_RENAME, {
                        payload: data,
                        type: MessageStripType.ERROR
                    });
                }
            });
    }

    /** @hidden */
    _checkName(e: Event, currentItem: UploadCollectionItem): void {
        const input = e.target as HTMLInputElement;
        const itemName = input.value.trim();
        const newName = currentItem.type === 'file' ? `${itemName}.${currentItem.name.split('.').pop()}` : itemName;
        const nameAlreadyExists = this._getList().some(
            (item) => currentItem.documentId !== item.documentId && item.name === newName
        );

        if (!this.sameFileNameAllowed && nameAlreadyExists) {
            currentItem.sameFilenameState = 'error';

            return;
        }

        delete currentItem.sameFilenameState;
    }

    /** @hidden
     * Opens the file selector.
     */
    _openUploadFiles(): void {
        const input = this._uploadFilesRef.nativeElement;
        if (input) {
            input.click();
        }
    }

    /** @hidden
     * Opens the update file version selector.
     */
    _openUpdateFileVersion(): void {
        if (this.disabled) {
            return;
        }

        const input = this._updateVersionRef.nativeElement;
        if (input) {
            this._currentUpdateFileVersion = this._activeItem as UploadCollectionFile;
            input.click();
        }
    }

    /** @hidden */
    _selectHandler(files: File[]): void {
        this._validateFiles(files);
        this._propagateFiles();
    }

    /** @hidden */
    _handleDrop(output: FilesValidatorOutput): void {
        this._validatedFiles = output;
        this._propagateFiles();
    }

    /** @hidden */
    _openNewFolderDialog(): void {
        const dialogRef = this._dialogService.open(NewFolderComponent, {
            responsivePadding: true,
            backdropClickCloseable: false,
            height: '320px',
            data: {
                currentFolder: this._getCurrentFolder(),
                maxFilenameLength: this.maxFilenameLength
            }
        } as DialogConfig);

        dialogRef.afterClosed.pipe(take(1)).subscribe((folderName) => {
            const folder = this._generateTemporaryNewFolder(folderName);
            const parentFolderId = this._getCurrentFolderId();
            const data = {
                parentFolderId,
                folder: { ...folder }
            };

            this._findParentFolderAndAddTemporaryFiles(parentFolderId, [folder]);

            this.dataSource
                .newFolder(data)
                .pipe(tap(() => this._match()))
                .subscribe({
                    next: () => {
                        this.showMessage(MessageType.CREATE, {
                            payload: data,
                            type: MessageStripType.SUCCESS
                        });
                    },
                    error: () => {
                        this.showMessage(MessageType.CREATE, {
                            payload: data,
                            type: MessageStripType.ERROR
                        });
                    }
                });
        });
    }

    /** @hidden */
    _moveToClicked(multiple?: boolean): void {
        if (this.disabled) {
            return;
        }

        const _activeItem = this._activeItem;
        const currentFolder = this._getCurrentFolder();
        const movableItems = multiple ? this.selectedItems : _activeItem ? [_activeItem] : [];
        const dialogRef = this._dialogService.open(
            MoveToComponent,
            {
                responsivePadding: true,
                verticalPadding: false,
                backdropClickCloseable: false,
                height: '350px',
                data: {
                    items: this.dataSource.dataProvider.items,
                    currentFolder,
                    movableFolders: movableItems.filter((item) => item?.type === 'folder'),
                    maxFilenameLength: this.maxFilenameLength
                } as MoveToComponentDialogData
            } as DialogConfig,
            this._injector
        );

        dialogRef.afterClosed.pipe(take(1)).subscribe(
            ({ selectedFolder, parentFolderId, folderName }) => {
                const payload: MoveToEvent = {
                    from: currentFolder,
                    to: selectedFolder,
                    items: movableItems
                };

                if (folderName) {
                    payload.newFolder = {
                        parentFolderId,
                        folderName
                    };
                }

                this.dataSource
                    .moveTo(payload)
                    .pipe(
                        tap(() => {
                            this.selectedItems = [];

                            this._match();
                        })
                    )
                    .subscribe({
                        next: () => {
                            this.showMessage(MessageType.MOVE, {
                                payload,
                                type: MessageStripType.SUCCESS
                            });
                        },
                        error: () => {
                            this.showMessage(MessageType.MOVE, {
                                payload,
                                type: MessageStripType.ERROR
                            });
                        }
                    });
            },
            (error) => {
                console.error(error);
            }
        );
    }

    /** @hidden */
    _downloadClicked(multiple?: boolean): void {
        if (this.disabled) {
            return;
        }

        const _activeItem = { ...this._activeItem };
        const items = (multiple ? this.selectedItems : [_activeItem]) as UploadCollectionFile[];

        this.dataSource.download({ items }).subscribe();
    }

    /** @hidden */
    _remove(multiple?: boolean): void {
        if (this.disabled) {
            return;
        }

        const _activeItem = { ...this._activeItem } as UploadCollectionItem;
        const items = multiple ? this.selectedItems : [_activeItem];
        const data = { parentFolderId: this._getCurrentFolderId(), items };

        this.dataSource
            .delete(data)
            .pipe(
                tap(() => {
                    this.selectedItems = [];

                    this._match();
                })
            )
            .subscribe({
                next: () => {
                    this.showMessage(MessageType.REMOVE, {
                        payload: data,
                        type: MessageStripType.SUCCESS
                    });
                },
                error: () => {
                    this.showMessage(MessageType.REMOVE, {
                        payload: data,
                        type: MessageStripType.ERROR
                    });
                }
            });
    }

    /** @hidden */
    _runUploadNewFileAfterFail(item: UploadCollectionFile): void {
        this.dataSource
            .runAfterFail({ parentFolderId: this._getCurrentFolderId(), items: [item] })
            .pipe(tap(() => this._match()))
            .subscribe();
    }

    /** @hidden */
    _cancelUploadNewFile(file: UploadCollectionFile): void {
        this.dataSource
            .cancelUploadNewFile({ parentFolderId: this._getCurrentFolderId(), item: file })
            .pipe(tap(() => this._match()))
            .subscribe();
    }

    /** @hidden */
    _messageStripDismiss(): void {
        this._message = undefined;
    }

    /** @hidden */
    _openFolder(item: UploadCollectionItem): void {
        if (item.type === 'file' || !item.documentId) {
            return;
        }

        if (this._breadcrumbList.length > 0) {
            this._breadcrumbList[this._breadcrumbList.length - 1].clikable = true;
        }

        this._breadcrumbList.push({
            clikable: false,
            folderId: item.documentId,
            folderName: item.name
        });

        this._match();
    }

    /** @hidden */
    _actionButton(item: UploadCollectionItem): void {
        this._activeItem = item;
    }

    /** @hidden */
    _onDropzone(event: boolean): void {
        this._showDragDropArea = true;
        this._onDragDropArea = event;
    }

    /** @hidden */
    _dragDropCancel(): void {
        this._showDragDropArea = false;
    }

    /** @hidden */
    _breadcrumbGoTo(event: MouseEvent, index?: number): void {
        event.preventDefault();
        event.stopPropagation();

        if (!Number.isInteger(index)) {
            this._breadcrumbList = [];
            this._match();

            return;
        }

        this._breadcrumbList = this._breadcrumbList.slice(0, index! + 1);
        this._breadcrumbList[this._breadcrumbList.length - 1].clikable = false;

        this._match();
    }

    /** @hidden */
    _pageChanged(pageNumber: number): void {
        if (!this.enablePagination || this._currentPage === pageNumber) {
            return;
        }

        this.selectedItems = [];
        this._currentPage = pageNumber;

        this._match();
    }

    /** @hidden */
    _itemsPerPageChange(value: number): void {
        if (value === this._itemsPerPage) {
            return;
        }

        this._itemsPerPage = value;
        if (this._currentPage * this._itemsPerPage > this._totalItems) {
            this._currentPage = Math.ceil(this._totalItems / this._itemsPerPage);
        }

        this._match();
    }

    /** @hidden */
    _searchInputChanged(): void {
        this._match();
    }

    /** @hidden */
    _onRowSelectionChange(data: TableRowSelectionChangeEvent<UploadCollectionItem>): void {
        if (!this.sameFileNameAllowed) {
            const removedItem = data.removed[0];
            this._clearItemSameFilenameState(removedItem);
        }

        this.selectedItems = data.selection;
    }

    /** @hidden */
    _getItemName(item: UploadCollectionItem): string {
        if (item.type === 'folder') {
            return item.name;
        }

        return item.name.split('.').slice(0, -1).join('.');
    }

    /** @hidden */
    _getItemExtension(item: UploadCollectionItem): string {
        if (item.type === 'folder') {
            return '';
        }

        return `.${item.name.split('.').pop()}`;
    }

    /** @hidden */
    _getIconByType(file: UploadCollectionFile): string {
        const type = `.${file.name.split('.').pop()}`;

        return this._imageExtensions.includes(type) ? 'background' : 'document';
    }

    /** @hidden */
    _showIfSelectedOnlyFiles(): boolean {
        return !this.selectedItems.some((item) => item.type === 'folder');
    }

    /** @hidden */
    _isSelectedItem(item: UploadCollectionItem): boolean {
        return this.selectedItems.some((selectedItem) => selectedItem.documentId === item.documentId);
    }

    /** @hidden */
    _getList(): UploadCollectionItem[] {
        return this.dataSource.dataProvider.list;
    }

    /** @hidden */
    _trackByDocumentId(index: number, item: UploadCollectionItem): UploadCollectionItem['documentId'] {
        return item.documentId;
    }

    /** @hidden */
    _getAllowedTypes(): string {
        return `${this.fileTypes?.join(', ')}${
            this.fileTypes?.length && this.mimeTypes?.length ? ', ' : ''
        }${this.mimeTypes?.join(', ')}`;
    }

    /** @hidden */
    private _validateFiles(files: File[]): void {
        this._validatedFiles = this._filesValidatorService.validation(files, {
            maxFileSize: this.maxFileSize,
            maxFileNameLength: this.maxFilenameLength,
            fileTypes: this.fileTypes,
            mimeTypes: this.mimeTypes
        });
    }

    /** @hidden */
    private _propagateFiles(): void {
        const { validFiles, typeMismatch, filenameLengthExceed, fileSizeExceed } = this._validatedFiles;

        if (validFiles) {
            if (this._currentUpdateFileVersion) {
                this._updateFileVersion(validFiles[0]);
            } else {
                this._uploadNewFiles(validFiles);
            }
        }

        if (typeMismatch) {
            const payload = { items: typeMismatch };
            const event = new TypeMismatchEvent(this, payload);

            this.showMessage(MessageType.TYPE_MISMATCH, { payload, type: MessageStripType.ERROR });

            this.typeMismatch.emit(event);
        }

        if (filenameLengthExceed) {
            const payload = { items: filenameLengthExceed };
            const event = new FilenameLengthExceedEvent(this, payload);

            this.showMessage(MessageType.FILE_NAME_LENGTH, { payload, type: MessageStripType.ERROR });

            this.filenameLengthExceed.emit(event);
        }

        if (fileSizeExceed) {
            const payload = { items: fileSizeExceed };
            const event = new FileSizeExceedEvent(this, payload);

            this.showMessage(MessageType.FILE_SIZE, { payload, type: MessageStripType.ERROR });

            this.fileSizeExceed.emit(event);
        }
    }

    /** @hidden */
    private _updateFileVersion(newItem: File): void {
        const currentFolderId = this._getCurrentFolderId();
        const currentItem = {
            ...this._currentUpdateFileVersion,
            status: UploadCollectionItemStatus.LOADING
        } as UploadCollectionItem;

        const data = {
            parentFolderId: this._getCurrentFolderId(),
            item: this._currentUpdateFileVersion,
            newItem
        } as UpdateVersionEvent;

        this._findParentFolderAndUpdateItem(currentFolderId, currentItem);

        this.dataSource
            .updateVersion(data)
            .pipe(tap(() => this._match()))
            .subscribe({
                next: () => {
                    this.showMessage(MessageType.UPDATE_VERSION, {
                        payload: data,
                        type: MessageStripType.SUCCESS
                    });
                    this._currentUpdateFileVersion = undefined;
                },
                error: () => {
                    this.showMessage(MessageType.UPDATE_VERSION, {
                        payload: data,
                        type: MessageStripType.ERROR
                    });
                }
            });
    }

    /** @hidden */
    private _uploadNewFiles(files: File[]): void {
        const currentFolderId = this._getCurrentFolderId();
        const newItems = this._generateTemporaryNewFiles(files);

        this._findParentFolderAndAddTemporaryFiles(currentFolderId, newItems);

        this.dataSource
            .upload({
                parentFolderId: currentFolderId,
                items: newItems.map((item) => ({ ...item }))
            })
            .pipe(tap(() => this._match()))
            .subscribe();
    }

    /** @hidden */
    private _getCurrentFolder(): UploadCollectionFolder | undefined {
        const currentFolderId = this._getCurrentFolderId();

        return !currentFolderId ? undefined : this._findFolderById(currentFolderId);
    }

    /** @hidden */
    private _getCurrentFolderId(): string | number | undefined {
        return this._breadcrumbList.length === 0
            ? undefined
            : this._breadcrumbList[this._breadcrumbList.length - 1].folderId;
    }

    /** @hidden */
    private _findFolderById(
        folderId: number | string,
        items: UploadCollectionItem[] = this.dataSource.dataProvider.items
    ): UploadCollectionFolder | undefined {
        let foundObj: UploadCollectionFolder | undefined;

        JSON.stringify(items, (_, nestedValue) => {
            if (nestedValue && nestedValue.documentId === folderId) {
                foundObj = nestedValue;
            }

            return nestedValue;
        });

        return foundObj;
    }

    /** @hidden */
    private _findParentFolderAndUpdateItem(
        parentFolderId: string | number | undefined,
        updatedItem: UploadCollectionItem,
        items = this.dataSource.dataProvider.items
    ): void {
        if (!parentFolderId) {
            const index = items.findIndex((item) => item.documentId === updatedItem.documentId);
            if (index !== -1) {
                items[index] = updatedItem;
            }

            this._match();

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
                    this._match();

                    break;
                }
            } else {
                this._findParentFolderAndUpdateItem(parentFolderId, updatedItem, currentItem.files);
            }
        }
    }

    /** @hidden */
    private _findParentFolderAndAddTemporaryFiles(
        parentFolderId: string | number | undefined,
        newItems: UploadCollectionItem[],
        items = this.dataSource.dataProvider.items
    ): void {
        if (!parentFolderId) {
            items.push(...newItems);
            this._match();

            return;
        }

        for (let i = 0; i < items.length; i++) {
            const currentItem = items[i];
            if (currentItem.type !== 'folder') {
                continue;
            }

            if (currentItem.documentId === parentFolderId) {
                currentItem.files.push(...newItems);
                this._match();

                break;
            } else {
                this._findParentFolderAndAddTemporaryFiles(parentFolderId, newItems, currentItem.files);
            }
        }
    }

    /** @hidden */
    private _generateTemporaryNewFiles(files: File[]): UploadCollectionFile[] {
        return files.map((file) => ({
            documentId: uuidv4(),
            type: 'file',
            name: file.name,
            uploadedBy: {
                id: uuidv4(),
                name: `You`
            },
            uploadedOn: new Date(),
            fileSize: file.size,
            version: 1,
            url: '',
            status: UploadCollectionItemStatus.LOADING,
            file
        }));
    }

    /** @hidden */
    private _generateTemporaryNewFolder(folderName: string): UploadCollectionFolder {
        return {
            documentId: uuidv4(),
            type: 'folder',
            name: folderName,
            uploadedBy: {
                id: Date.now(),
                name: 'You'
            },
            uploadedOn: new Date(),
            files: [],
            status: UploadCollectionItemStatus.LOADING
        };
    }

    /** @hidden */
    private _initializeDS(ds: FdpUploadCollectionDataSource): void {
        this._visibleList$.next([]);
        if (isDataSource(this.dataSource)) {
            this.dataSource.close();
            if (this._dsSubscription) {
                this._dsSubscription.unsubscribe();
                this._dsSubscription = undefined;
            }
        }

        this._dataSource = this._openDataStream(ds);

        // initial data fetch
        this._match();
    }

    /** @hidden */
    private _openDataStream(ds: FdpUploadCollectionDataSource): UploadCollectionDataSource {
        const initDataSource = this._toDataStream(ds);
        if (initDataSource === undefined) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }
        /**
         * This is single point of data entry to the component. We dont want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsSubscription = initDataSource.open().subscribe((data) => {
            this._visibleList$.next(data);

            this._totalItems = initDataSource.dataProvider.totalItems;

            this._countUnvisibleItems();
        });

        return initDataSource;
    }

    /** @hidden */
    private _toDataStream(ds: FdpUploadCollectionDataSource): UploadCollectionDataSource | undefined {
        if (isDataSource(ds)) {
            return ds as UploadCollectionDataSource;
        }

        return undefined;
    }

    /** @hidden */
    private _match(): void {
        const query = new Map();

        query.set('folderId', this._getCurrentFolderId());
        query.set('page', this._currentPage);
        query.set('searchText', this._searchText || '*');

        if (this.enablePagination) {
            query.set('limit', this._itemsPerPage);
        }

        this.dataSource.match(query);
    }

    /** @hidden */
    private _countUnvisibleItems(): void {
        const itemsPerPage = this._itemsPerPage as number;
        this._countShowedItems = this._currentPage * itemsPerPage - itemsPerPage + 1;
        this._countNotShowedItems = this._countShowedItems + this._visibleList$.value.length - 1;
    }

    /** @hidden */
    private _clearItemSameFilenameState(currentItem: UploadCollectionItem): void {
        if (!currentItem) {
            return;
        }

        for (const item of this._getList()) {
            if (item.documentId === currentItem.documentId) {
                delete item.sameFilenameState;
                break;
            }
        }
    }
}
