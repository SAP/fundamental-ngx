import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const filesizemap = new Map([['KB', 1024], ['MB', 1048576], ['GB', 1073741824], ['TB', 1099511627776]]);
/**
 * Tool to facilitate the input of files from the user.
 * It supports drag and drop, multiple input, max file size and more.
 * The drag events make it very easy to create and style elements like a dropzone.
 */
@Component({
    selector: 'fd-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploaderComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent implements ControlValueAccessor {
    /** @hidden */
    @HostBinding('class.fd-file-uploader')
    fdFileInputClass: boolean = true;

    /** @hidden */
    @ViewChild('fileInput')
    inputRef: ElementRef;

    @ViewChild('textInput')
    inputRefText: ElementRef;

    /** Whether the file input is disabled. */
    @Input()
    disabled: boolean = false;

    /** Whether the file input should accept multiple files. */
    @Input()
    multiple: boolean = true;

    /** Accepted file extensions. Format: `'.png,.jpg'`. */
    @Input()
    accept: string;

    /** Whether the file input accepts drag and dropped files. */
    @Input()
    dragndrop: boolean = true;

    /** Max file size in bytes that the input will accept. */
    @Input()
    maxFileSize: string;

    /** Min file size in bytes that the input will accept. */
    @Input()
    minFileSize: string;

    /** Id for the input element. */
    @Input()
    id: string;

    /** aria-label value for input element. */
    @Input()
    ariaLabel: string;

    /** aria-label-by value for input element.*/
    @Input()
    ariaLabelledBy: string;

    /** placeholder for input element. */
    @Input()
    placeholder: string;

    /** button value */
    @Input()
    buttonLabel: string;

    /** value for input element. */
    @Input()
    buttonAriaLabel: string;

    /**boolean value to enable compact mode */
    @Input()
    compact: boolean;

    /**specifies number of files to allow to select */
    @Input()
    fileLimit: number;


    fileName: string = '';

    valid_files: File[] = [];

    invalid_files: File[] = [];



    /** Event fired when files are selected. Passed object is the array of files selected. */
    @Output()
    readonly selectedFilesChanged: EventEmitter<File[]> = new EventEmitter<File[]>();

    /** Event fired when some invalid files are selected. Passed object is the array of invalid files. */
    @Output()
    readonly selectedInvalidFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

    /** Event fired when the dragged file enters the component boundaries. */
    @Output()
    readonly onDragEnter: EventEmitter<void> = new EventEmitter<void>();

    /** Event fired when the dragged file exits the component boundaries. */
    @Output()
    readonly onDragLeave: EventEmitter<void> = new EventEmitter<void>();

    constructor(private changeDetRef: ChangeDetectorRef) { }

    /** @hidden */
    onChange: Function = () => { };

    /** @hidden */
    onTouched: Function = () => { };



    /** @hidden */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetRef.detectChanges();
    }

    /** @hidden */
    writeValue(files: File[]): void {
        // not needed - should be handled by user.
    }

    /** @hidden */
    selectHandler(event: File[]) {

        this.validateFiles(event);
        if (this.valid_files.length > 0) {
            this.setInputValue(this.valid_files);
            this.onChange(this.valid_files);
            this.selectedFilesChanged.emit(this.valid_files);
        }
        if (this.invalid_files.length > 0) {
            this.selectedInvalidFiles.emit(this.invalid_files);
        } else {
            this.setInputValue(event);
            this.onChange(event);
            this.selectedFilesChanged.emit(event);
        }

    }

    validateFiles(event: File[]) {
        if (this.fileLimit && event.length > this.fileLimit) {
            throw ('FileLimitError - Selected files count is more than specified limit ');
        }

        if (this.maxFileSize && this.minFileSize) {
            const maxsize = this.parseFileSize(this.maxFileSize);
            const minsize = this.parseFileSize(this.minFileSize);
            event.forEach((file) => {
                if (file.size < maxsize && file.size > minsize) {
                    this.valid_files.push(file);
                } else {
                    this.invalid_files.push(file);
                }
            });
        } else if (this.maxFileSize) {
            const maxsize = this.parseFileSize(this.maxFileSize);
            event.forEach((file) => {
                if (file.size < maxsize) {
                    this.valid_files.push(file);
                } else {
                    this.invalid_files.push(file);
                }
            });
        } else if (this.minFileSize) {
            const minsize = this.parseFileSize(this.minFileSize);
            event.forEach((file) => {
                if (file.size > minsize) {
                    this.valid_files.push(file);
                } else {
                    this.invalid_files.push(file);
                }
            });
        }

    }

    setInputValue(selectedFiles: File[]) {
        let fileName = '';
        selectedFiles.forEach((file) => {
            fileName = fileName.concat(' ' + file.name);
        });
        this.inputRefText.nativeElement.value = fileName;
        this.inputRefText.nativeElement.title = fileName;
    }

    parseFileSize(filesize: string) {
        const sizes = filesize.match(/[\d\.]+|\D+/g);
        if (sizes.length > 1) {
            const size = Number(sizes[0]);
            const unit = sizes[1].toUpperCase().trim();
            if (isNaN(size)) {
                throw new Error('FileSizeError - Invalid File size please check.');
            }
            else if (unit === ('B' || 'BYTE' || 'BYTES')) {
                return size;
            }
            else if (unit === 'KB') {
                return filesizemap.get(unit) * size;
            }
            else if (unit === 'MB') {
                return filesizemap.get(unit) * size;
            }
            else if (unit === 'GB') {
                return filesizemap.get(unit) * size;
            }
            else if (unit === 'TB') {
                return filesizemap.get(unit) * size;
            }
        }
        else {
            if (isNaN(Number(sizes))) {
                throw new Error('FileSizeError - Invalid File size please check');
            }
            return (Number(sizes));
        }
    }

    /**
     * Opens the file selector.
     */
    public open(): void {
        this.inputRef.nativeElement.click();
    }

    /**
     * Clears the files from the input.
     */
    public clear(): void {
        this.inputRef.nativeElement.value = '';
        this.onChange([]);
    }
}
