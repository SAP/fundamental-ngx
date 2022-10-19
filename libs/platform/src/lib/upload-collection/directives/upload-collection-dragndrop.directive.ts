import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { FilesValidatorService, FilesValidatorOutput } from '../services/files-validator.service';

/**
 * Directive that handles the drag and drop feature of the file input.
 */
@Directive({
    selector: '[fdpUploadCollectionDragnDrop]'
})
export class UploadCollectionDragnDropDirective {
    /** Whether multiple files can be dropped at once. */
    @Input()
    multiple = true;

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

    /** Whether selecting of new files is disabled. */
    @Input()
    disabled = false;

    /** Whether drag and drop is enabled. Disables this directive. */
    @Input()
    dragndrop = true;

    /** Event emitted when files are dropped. Passes back an array of files. */
    @Output()
    readonly fileChanged = new EventEmitter<FilesValidatorOutput>();

    /** Event emitted when the dragged file enters the dropzone or exits from it. */
    @Output()
    readonly cancel = new EventEmitter<void>();

    /** Event emitted when the dragged file enters the dropzone. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDropzone = new EventEmitter<boolean>();

    /** @hidden */
    private dropzonePreviousState: boolean | null = null;

    /** @hidden */
    private elementSelector: string;

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _filesValidatorService: FilesValidatorService
    ) {
        const element = this._elementRef.nativeElement as HTMLElement;
        this.elementSelector = element.id ? `#${element.id}` : '';
        this.elementSelector += element.className ? `.${element.className.split(' ').join('.')}` : '';
        if (!this.elementSelector) {
            this.elementSelector = `${element.localName}[fdpUploadCollectionDragnDrop]`;
        }
    }

    /** @hidden */
    @HostListener('window:dragover', ['$event'])
    onWindowDragover(event: DragEvent): void {
        if (!this.dragndrop || this.disabled) {
            return;
        }

        this._muteEvent(event);

        const isDragDropArea = !!(event.target instanceof HTMLElement && event.target.closest(this.elementSelector));
        if (this.dropzonePreviousState !== isDragDropArea) {
            this.dropzonePreviousState = isDragDropArea;
            this.onDropzone.emit(isDragDropArea);
        }
    }

    /** @hidden */
    @HostListener('window:dragleave', ['$event'])
    onDragLeave(event: DragEvent): void {
        if (!this.dragndrop || this.disabled) {
            return;
        }

        const leavePositions = [event.screenX, event.screenY, event.clientX, event.clientY, event.pageX, event.pageY];

        if (!leavePositions.some((item) => item > 0)) {
            this._muteEvent(event);
            this.dropzonePreviousState = null;
            this.cancel.emit();
        }
    }

    /** @hidden */
    @HostListener('window:drop', ['$event'])
    onDrop(event: DragEvent): void {
        if (!this.dragndrop || this.disabled) {
            return;
        }

        this.dropzonePreviousState = null;
        this.cancel.emit();

        const isDragDropArea = !!(event.target instanceof HTMLElement && event.target.closest(this.elementSelector));
        if (!isDragDropArea) {
            return;
        }

        this._muteEvent(event);
        const rawFiles = event.dataTransfer?.files ?? [];
        const files: File[] = Array.from(rawFiles);

        const output = this._filesValidatorService.validation(files, {
            maxFileSize: this.maxFileSize,
            maxFileNameLength: this.maxFilenameLength,
            fileTypes: this.fileTypes,
            mimeTypes: this.mimeTypes
        });

        this.fileChanged.emit(output);
    }

    /** @hidden */
    private _muteEvent(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }
}
