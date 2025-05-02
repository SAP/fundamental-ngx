import { ENTER, SPACE, TAB } from '@angular/cdk/keycodes';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyUtil, Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { stateType } from '@fundamental-ngx/core/radio';
import { Subscription } from 'rxjs';
import { FileUploaderDragndropDirective } from './directives/file-uploader-dragndrop.directive';
import { FileUploaderSelectDirective } from './directives/file-uploader-select.directive';
import { FileUploadOutput, FileUploaderService } from './file-uploader.service';

let fileUploaderInputUniqueId = 0;

/**
 * Tool to facilitate the input of files from the user.
 * It supports drag and drop, multiple input, max file size and more.
 * The drag events make it very easy to create and style elements like a dropzone.
 */
@Component({
    selector: 'fd-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrl: './file-uploader.component.scss',
    host: {
        '(blur)': 'onTouched()',
        class: 'fd-file-uploader'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploaderComponent),
            multi: true
        },
        registerFormItemControl(FileUploaderComponent),
        contentDensityObserverProviders()
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FileUploaderDragndropDirective, ButtonComponent, FileUploaderSelectDirective]
})
export class FileUploaderComponent implements ControlValueAccessor, OnDestroy, FormItemControl {
    /** @hidden */
    @ViewChild('fileInput')
    inputRef: ElementRef<HTMLInputElement>;

    /** @hidden */
    @ViewChild('textInput')
    inputRefText: ElementRef;

    /** Whether the file input is disabled. */
    @Input()
    disabled = false;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether the file input should accept multiple files. */
    @Input()
    multiple = true;

    /** Accepted file extensions. Format: `'.png,.jpg'`. */
    @Input()
    accept!: string;

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
    ariaLabel: Nullable<string>;

    /** aria-label-by value for input element.*/
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** placeholder for input element. */
    @Input()
    placeholder: string;

    /** button value */
    @Input()
    buttonLabel: string;

    /** value for input element. */
    @Input()
    buttonAriaLabel: Nullable<string>;

    /** The field to set state of radio button using:
     * 'success' | 'error' | 'warning' | 'default' | 'information'
     * by default value is set to 'default'
     */
    @Input()
    state: stateType = 'default';

    /** specifies number of files to allow to select */
    @Input()
    fileLimit: number;

    /** Whether or not to hide the input, leaving only the upload/browse button. */
    @Input()
    inputHidden = false;

    /** Width of the file uploader */
    @Input()
    width: string;

    /** Event fired when files are selected. Passed object is the array of files selected. */
    @Output()
    readonly selectedFilesChanged = new EventEmitter<File[]>();

    /** Event fired when some invalid files are selected. Passed object is the array of invalid files. */
    @Output()
    readonly selectedInvalidFiles = new EventEmitter<File[]>();

    /** Event fired when the dragged file enters the component boundaries. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDragEnter = new EventEmitter<void>();

    /** Event fired when the dragged file exits the component boundaries. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDragLeave = new EventEmitter<void>();

    /** * It stores the valid files  */
    validFiles: File[] = [];

    /** * It stores the invalid files  */
    invalidFiles: File[] = [];

    /** @hidden */
    private _previousValidFiles;

    /** @hidden */
    private _previousInvalidFiles;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private _fileUploadService: FileUploaderService,
        private _changeDetRef: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    onChange: (values: File[]) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

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
        if (this.validFiles.length > 0 && files && files.length === 0) {
            this.clear();
        } else if (!files?.length) {
            return;
        } else {
            this._propagateFiles(false);
        }
    }

    /** @hidden */
    handleDrop(files: FileUploadOutput): void {
        this.validFiles = files.validFiles ?? [];
        this.invalidFiles = files.invalidFiles ?? [];
        this._propagateFiles();
    }

    /** @hidden */
    selectHandler(event: File[]): void {
        this.validateFiles(event);
        this._propagateFiles();
    }

    /** @hidden */
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

        this.validFiles = fileOutput.validFiles ?? [];
        this.invalidFiles = fileOutput.invalidFiles ?? [];
    }

    /** @hidden */
    setInputValue(selectedFiles: File[], fromClear = false): void {
        const fileName = selectedFiles.map((file) => file.name).join(' ');
        if (!this.inputRefText) {return;}
        this.inputRefText.nativeElement.value = fileName;
        this.inputRefText.nativeElement.title = fileName || this.placeholder;
        this.inputRefText.nativeElement.placeholder = fileName || this.placeholder;
        if (!fromClear) {
            this.inputRefText.nativeElement.focus();
        }
    }

    /** @hidden */
    keyDownHandle(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.open();
        }
        if (!KeyUtil.isKeyCode(event, [TAB])) {
            event.preventDefault();
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
        const shouldPropagate = this.validFiles.length > 0 || this.invalidFiles.length > 0;
        this.validFiles = [];
        this.invalidFiles = [];
        this.inputRef.nativeElement.value = '';
        if (shouldPropagate) {
            this._propagateFiles();
        }
    }

    /** @hidden */
    private _propagateFiles(handleOnChange = true): void {
        this.setInputValue(this.validFiles);
        if (handleOnChange) {
            this.onChange(this.validFiles);
        }
        if (this._previousValidFiles !== this.validFiles) {
            this._previousValidFiles = this.validFiles;
            this.selectedFilesChanged.emit(this.validFiles);
        }
        if (this._previousInvalidFiles !== this.invalidFiles) {
            this._previousInvalidFiles = this.invalidFiles;
            this.selectedInvalidFiles.emit(this.invalidFiles);
        }
    }
}
