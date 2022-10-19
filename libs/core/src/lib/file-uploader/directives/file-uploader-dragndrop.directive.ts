import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FileUploaderService, FileUploadOutput } from '../file-uploader.service';

/**
 * Directive that handles the drag and drop feature of the file input.
 */
@Directive({
    selector: '[fdFileDragnDrop], [fd-file-drag-n-drop]'
})
export class FileUploaderDragndropDirective {
    /** Whether multiple files can be dropped at once. */
    @Input()
    multiple = true;

    /** Accepted file extensions. Format: `'.png,.jpg'`. */
    @Input()
    accept: string;

    /** Max file size in bytes that the input will accept. */
    @Input()
    maxFileSize = '';

    /** Min file size in bytes that the input will accept. */
    @Input()
    minFileSize = '';

    /** Whether selecting of new files is disabled. */
    @Input()
    disabled = false;

    /** Whether drag and drop is enabled. Disables this directive. */
    @Input()
    dragndrop = true;

    /** Event emitted when files are dropped. Passes back an array of files. */
    @Output()
    readonly fileChanged = new EventEmitter<FileUploadOutput>();

    /** Event emitted when the dragged file enters the dropzone. */
    @Output()
    readonly dragEntered = new EventEmitter<void>();

    /** Event emitted when the dragged file exits the dropzone. */
    @Output()
    readonly dragLeave = new EventEmitter<void>();

    /** @hidden */
    private elementStateCounter = 0;

    /** @hidden */
    constructor(private _fileUploadService: FileUploaderService) {}

    /** @hidden */
    @HostListener('dragover', ['$event'])
    public onDragover(event: Event): void {
        if (this.dragndrop) {
            this._muteEvent(event);
        }
    }

    /** @hidden */
    @HostListener('dragenter', [])
    public onDragenter(): void {
        ++this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 1) {
            this.dragEntered.emit();
        }
    }

    /** @hidden */
    @HostListener('dragleave', ['$event'])
    public onDragleave(event: Event): void {
        --this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 0) {
            this._muteEvent(event);
            this.dragLeave.emit();
        }
    }

    /** @hidden */
    @HostListener('drop', ['$event'])
    public onDrop(event: any): void {
        this.elementStateCounter = 0;

        if (!this.dragndrop || this.disabled) {
            return;
        }
        this._muteEvent(event);
        const rawFiles = event.dataTransfer.files;
        const files: File[] = Array.from(rawFiles);

        if (!this.multiple && files.length > 1) {
            this.fileChanged.emit({
                validFiles: [],
                invalidFiles: files
            });
            return;
        }

        const fileOutput: FileUploadOutput = this._fileUploadService.validateFiles(
            files,
            this.minFileSize,
            this.maxFileSize,
            this.accept
        );

        this.fileChanged.emit(fileOutput);
    }

    /** @hidden */
    private _muteEvent(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }
}
