import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { stateType } from '../radio/radio-button/radio-button.component';
import { ContentDensityService } from '../utils/public_api';
import { FileUploaderService, FileUploadOutput } from './file-uploader.service';
import { Subscription } from 'rxjs';

let fileUploaderInputUniqueId = 0;

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
export class FileUploaderComponent implements ControlValueAccessor, OnInit, OnDestroy {
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
    compact?: boolean;

    /** The field to set state of radio button using:
     * 'success' | 'error' | 'warning' | 'default' | 'information'
     * by default value is set to 'default'
     */
    @Input()
    state: stateType = 'default';

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

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        private _fileUploadService: FileUploaderService,
        private _changeDetRef: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService._contentDensityListener.subscribe(density => {
                this.compact = density !== 'cozy';
                this._changeDetRef.markForCheck();
            }));
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

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
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    writeValue(files: File[]): void {
        // not needed - should be handled by user.
    }

    /** @hidden */
    handleDrop(files: FileUploadOutput): void {
        this.validFiles = files.validFiles;
        this.invalidFiles = files.invalidFiles;
        this._propagateFiles();
    }

    /** @hidden */
    selectHandler(event: File[]): void {
        this.validateFiles(event);
        this._propagateFiles();
    }

    validateFiles(event: File[]): void {
        if (this.fileLimit && event.length > this.fileLimit) {
            throw new Error('FileLimitError - Selected files count is more than specified limit ');
        }

        const fileOutput: FileUploadOutput = this._fileUploadService.validateFiles(
            event,
            this.minFileSize,
            this.maxFileSize,
            this.accept
        );

        this.validFiles = fileOutput.validFiles;
        this.invalidFiles = fileOutput.invalidFiles;
    }

    setInputValue(selectedFiles: File[]): void {
        let fileName = '';
        selectedFiles.forEach((file) => (fileName = fileName.concat(' ' + file.name)));
        this.inputRefText.nativeElement.value = fileName;
        this.inputRefText.nativeElement.title = fileName;
        this.inputRefText.nativeElement.placeholder = fileName;
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
    private _propagateFiles(): void {
        this.setInputValue(this.validFiles);
        this.onChange(this.validFiles);
        this.selectedFilesChanged.emit(this.validFiles);
        this.selectedInvalidFiles.emit(this.invalidFiles);
    }
}
