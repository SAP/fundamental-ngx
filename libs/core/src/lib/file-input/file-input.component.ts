import {
    ChangeDetectionStrategy, ChangeDetectorRef,
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

/**
 * Tool to facilitate the input of files from the user.
 * It supports drag and drop, multiple input, max file size and more.
 * The drag events make it very easy to create and style elements like a dropzone.
 */
@Component({
    selector: 'fd-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FileInputComponent),
        multi: true,
    }],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileInputComponent implements ControlValueAccessor {

    /** @hidden */
    @HostBinding('class.fd-file-input')
    fdFileInputClass: boolean = true;

    /** @hidden */
    @ViewChild('input')
    inputRef: ElementRef;

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
    maxFileSize: number;

    /** Event fired when files are selected. Passed object is the array of files selected. */
    @Output()
    readonly onSelect: EventEmitter<File[]> = new EventEmitter<File[]>();

    /** Event fired when some invalid files are selected. Passed object is the array of invalid files. */
    @Output()
    readonly onInvalidFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

    /** Event fired when the dragged file enters the component boundaries. */
    @Output()
    readonly onDragEnter: EventEmitter<void> = new EventEmitter<void>();

    /** Event fired when the dragged file exits the component boundaries. */
    @Output()
    readonly onDragLeave: EventEmitter<void> = new EventEmitter<void>();

    constructor (
        private changeDetRef: ChangeDetectorRef
    ) {}

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
    selectHandler(event: File[]) {
        if (this.maxFileSize) {
            const valid_files: File[] = [];
            const invalid_files: File[] = [];
            event.forEach(file => {
                if (file.size < this.maxFileSize) {
                    valid_files.push(file);
                } else {
                    invalid_files.push(file);
                }
            });
            if (valid_files.length > 0) {
                this.onChange(valid_files);
                this.onSelect.emit(valid_files);
            }
            if (invalid_files.length > 0) {
                this.onInvalidFiles.emit(invalid_files);
            }
        } else {
            this.onChange(event);
            this.onSelect.emit(event);
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
