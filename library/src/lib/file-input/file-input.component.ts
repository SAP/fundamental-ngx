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
    multiple: boolean = false;

    @Input()
    accept: string;

    @Input()
    dragndrop: boolean = true;

    @Output()
    onSelect: EventEmitter<File[]> = new EventEmitter<File[]>();

    @Output()
    onInvalidFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

    @Output()
    onDragOver: EventEmitter<null> = new EventEmitter<null>();

    @Output()
    onDragStart: EventEmitter<null> = new EventEmitter<null>();

    @Output()
    onDragEnd: EventEmitter<null> = new EventEmitter<null>();

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
        this.onChange(event);
        this.onSelect.emit(event);
    }

    public open(): void {
        this.inputRef.nativeElement.click();
    }

    public clear(): void {
        this.inputRef.nativeElement.value = '';
        this.onChange([]);
    }

}
