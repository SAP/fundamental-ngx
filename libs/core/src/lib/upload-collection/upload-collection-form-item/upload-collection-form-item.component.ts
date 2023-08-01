import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import deprecated from "deprecated-decorator";

@Component({
    selector: 'fd-upload-collection-form-item',
    host: { class: 'fd-upload-collection__form-item' },
    templateUrl: './upload-collection-form-item.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UploadCollectionFormItemComponent implements ControlValueAccessor {
    /**
     * @deprecated use i18n capabilities instead
     * Value for the input's placeholder.
     */
    @Input()
    @deprecated('i18n capabilities \'coreUploadCollection.formItemPlaceholder\' key')
    placeholder: string;

    /** @hidden */
    @Input()
    _editMode = false;

    /** @hidden */
    _fileNameValue: string;

    /** @hidden */
    _extension: string;

    /** Event emitted when the dragged file exits the dropzone. */
    @Output()
    readonly fileNameChanged = new EventEmitter<string>();

    /** Value of the text input. */
    set fileName(value) {
        this._fileNameValue = value;
        this.onChange(value);
        this.onTouched();
        this.fileNameChanged.emit(value);
    }
    get fileName(): string {
        return this._fileNameValue;
    }

    /** @hidden */
    onChange: (value: string) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    writeValue(value: string): void {
        this.fileName = value;
    }

    /** @hidden */
    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
