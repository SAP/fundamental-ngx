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

let fileUploaderInputUniqueId = 0;

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
    fdFileInputClass = true;

    /** @hidden */
    @ViewChild('fileInput')
    inputRef: ElementRef;

    @ViewChild('textInput')
    inputRefText: ElementRef;

    /** Whether the file input is disabled. */
    @Input()
    disabled = false;

    /** Whether the file input should accept multiple files. */
    @Input()
    multiple = true;

    /** Accepted file extensions. Format: `'.png,.jpg'`. */
    @Input()
    accept: string;

    /** Whether the file input accepts drag and dropped files. */
    @Input()
    dragndrop = true;

    /** Max file size in bytes that the input will accept. */
    @Input()
    maxFileSize = '';

    /** Min file size in bytes that the input will accept. */
    @Input()
    minFileSize = '';

    /** Id for the input element. */
    @Input()
    id: string = 'fd-file-uploader-input' + fileUploaderInputUniqueId++;

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

    /** boolean value to enable compact mode */
    @Input()
    compact: boolean;

    /** specifies number of files to allow to select */
    @Input()
    fileLimit: number;

    /*** It stores the valid files  */
    validFiles: File[] = [];

    /*** It stores the invalid files  */
    invalidFiles: File[] = [];

    /** Event fired when files are selected. Passed object is the array of files selected. */
    @Output()
    readonly selectedFilesChanged = new EventEmitter<File[]>();

    /** Event fired when some invalid files are selected. Passed object is the array of invalid files. */
    @Output()
    readonly selectedInvalidFiles = new EventEmitter<File[]>();

    /** Event fired when the dragged file enters the component boundaries. */
    @Output()
    readonly onDragEnter = new EventEmitter<void>();

    /** Event fired when the dragged file exits the component boundaries. */
    @Output()
    readonly onDragLeave = new EventEmitter<void>();

    constructor(private changeDetRef: ChangeDetectorRef) {}

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};


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
    selectHandler(event: File[]): void {
        this.validateFiles(event);

        if (this.validFiles.length > 0) {
            this.setInputValue(this.validFiles);
            this.onChange(this.validFiles);
            this.selectedFilesChanged.emit(this.validFiles);
        }
        if (this.invalidFiles.length > 0) {
            this.selectedInvalidFiles.emit(this.invalidFiles);
        }

    }

    validateFiles(event: File[]): void {
        if (this.fileLimit && event.length > this.fileLimit) {
            throw new Error('FileLimitError - Selected files count is more than specified limit ');
        }
        const maxSize = this.parseFileSize(this.maxFileSize);
        const minSize = this.parseFileSize(this.minFileSize);

        const checkSize = (fileSize: number): boolean => {
            if (this.maxFileSize && fileSize > maxSize) {
                return false;
            }
            if (this.minFileSize && fileSize < minSize) {
                return false;
            }
            return true;
        };

        let allowedExtensions = null;
        if (this.accept) {
            allowedExtensions = this.accept.toLocaleLowerCase().replace(/[\s.]/g, '').split(',')
        }

        this.validFiles = event.filter(file => checkSize(file.size) && this._checkExtension(file, allowedExtensions));
        this.invalidFiles = event.filter(file => !checkSize(file.size) || !this._checkExtension(file, allowedExtensions));
    }

    setInputValue(selectedFiles: File[]): void {
        let fileName = '';
        selectedFiles.forEach((file) => {
            fileName = fileName.concat(' ' + file.name);
        });
        this.inputRefText.nativeElement.value = fileName;
        this.inputRefText.nativeElement.title = fileName;
    }

    parseFileSize(fileSize: string): number {

        if (fileSize === '') {
            return 0;
        }
        const sizes = fileSize.match(/[\d\.]+|\D+/g);
        if (sizes.length > 1) {
            const size = Number(sizes[0].replace(/ +/g, ''));
            const unit = sizes[1].replace(/ +/g, '').toUpperCase();
            if (isNaN(size)) {
                throw new Error('FileSizeError - Invalid File size please check.');
            } else if (unit === 'B' || unit === 'BYTE' || unit === 'BYTES') {
                return size;
            } else if (unit === 'KB') {
                return filesizemap.get(unit) * size;
            } else if (unit === 'MB') {
                return filesizemap.get(unit) * size;
            } else if (unit === 'GB') {
                return filesizemap.get(unit) * size;
            } else if (unit === 'TB') {
                return filesizemap.get(unit) * size;
            } else {
                throw new Error('FileSizeError - Invalid File size please check.');
            }
        } else {
            if (isNaN(Number(sizes))) {
                throw new Error('FileSizeError - Invalid File size please check.');
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

    /** @hidden */
    private _checkExtension(file: File, allowedExtensions?: string[]): boolean {
        const extension = file.name.split('.')[file.name.split('.').length - 1];
        return !allowedExtensions || allowedExtensions.lastIndexOf(extension) !== -1;
    }

}
