import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'fd-upload-collection-form-item',
    host: { class: 'fd-upload-collection__form-item' },
    templateUrl: './upload-collection-form-item.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UploadCollectionFormItemComponent implements ControlValueAccessor {
    /** @hidden */
    @Input()
    editMode = false;

    /** @hidden */
    fileNameValue: string;

    /** @hidden */
    extension: string;

    /** Event emitted when the dragged file exits the dropzone. */
    @Output()
    readonly fileNameChanged = new EventEmitter<string>();

    /** Get the value of the text input. */
    get fileName(): string {
        return this.fileNameValue;
    }

    /** Set the value of the text input. */
    set fileName(value) {
        this.fileNameValue = value;
        this.onChange(value);
        this.onTouched();
        this.fileNameChanged.emit(value);
    }

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** @hidden */
    writeValue(value: any): void {
        this.fileName = value;
    }

    /** @hidden */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }
}
