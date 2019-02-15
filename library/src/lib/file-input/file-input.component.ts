import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
})
export class FileInputComponent implements ControlValueAccessor {

    @ViewChild('input')
    inputRef: ElementRef;

    @Input()
    disabled: boolean = false;

    @Input()
    multiple: boolean = true;

    @Input()
    accept: string;

    @Input()
    dragndrop: boolean = true;

    @Input()
    maxFileSize: number;

    @Output()
    onSelect: EventEmitter<File[]> = new EventEmitter<File[]>();

    @Output()
    onInvalidFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

    @Output()
    onDragEnter: EventEmitter<null> = new EventEmitter<null>();

    @Output()
    onDragLeave: EventEmitter<null> = new EventEmitter<null>();

    onChange: Function = () => {};
    onTouched: Function = () => {};

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(files: File[]): void {
        // not needed - should be handled by user.
    }

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

    public open(): void {
        this.inputRef.nativeElement.click();
    }

    public clear(): void {
        this.inputRef.nativeElement.value = '';
        this.onChange([]);
    }

}
