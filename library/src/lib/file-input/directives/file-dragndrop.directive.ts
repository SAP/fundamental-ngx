import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * Directive that handles the drag and drop feature of the file input.
 */
@Directive({
    selector: '[fdFileDragnDrop]'
})
export class FileDragndropDirective {

    /** Whether multiple files can be dropped at once. */
    @Input()
    multiple: boolean = true;

    /** Accepted file extensions. Format: `'.png,.jpg'`. */
    @Input()
    accept: string;

    /** Whether selecting of new files is disabled. */
    @Input()
    disabled: boolean = false;

    /** Whether drag and drop is enabled. Disables this directive. */
    @Input()
    dragndrop: boolean = true;

    /** Event emitted when files are selected. Passes back an array of files. */
    @Output()
    readonly onFileChange: EventEmitter<File[]> = new EventEmitter<File[]>();

    /** Event emitted when invalid files are selected. Passes back an array of files. */
    @Output()
    readonly onInvalidFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

    /** Event emitted when the dragged file enters the dropzone. */
    @Output()
    readonly onDragEnter: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted when the dragged file exits the dropzone. */
    @Output()
    readonly onDragLeave: EventEmitter<void> = new EventEmitter<void>();

    private elementStateCounter: number = 0;

    /** @hidden */
    @HostListener('dragover', ['$event'])
    public onDragover(event) {
        if (this.dragndrop) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /** @hidden */
    @HostListener('dragenter', [])
    public onDragenter() {
        ++this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 1) {
            this.onDragEnter.emit();
        }
    }

    /** @hidden */
    @HostListener('dragleave', ['$event'])
    public onDragleave(event) {
        --this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 0) {
            event.preventDefault();
            event.stopPropagation();
            this.onDragLeave.emit();
        }
    }

    /** @hidden */
    @HostListener('drop', ['$event'])
    public onDrop(event) {
        this.elementStateCounter = 0;

        if (!this.dragndrop || this.disabled) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const rawFiles = event.dataTransfer.files;
        const files: File[] = Array.from(rawFiles);

        if (!this.multiple && files.length > 1) {
            this.onInvalidFiles.emit(files);
            return;
        }

        const valid_files: File[] = [];
        const invalid_files: File[] = [];
        if (files.length > 0) {
            if (!this.accept) {
                files.forEach((file: File) => {
                    valid_files.push(file);
                });
            } else {
                const allowed_extensions = this.accept.toLocaleLowerCase().replace(/[\s.]/g, '').split(',');
                files.forEach((file: File) => {
                    const ext = file.name.split('.')[file.name.split('.').length - 1];
                    if (allowed_extensions.lastIndexOf(ext) !== -1) {
                        valid_files.push(file);
                    } else {
                        invalid_files.push(file);
                    }
                });
            }
            this.onFileChange.emit(valid_files);
            if (invalid_files.length > 0) {
                this.onInvalidFiles.emit(invalid_files);
            }
        }
    }
}
