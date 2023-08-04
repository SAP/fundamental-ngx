import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { warnOnce } from '@fundamental-ngx/cdk/utils';

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
    set placeholder(value: string) {
        warnOnce(
            "Property placeholder is deprecated. Use i18n capabilities 'coreUploadCollection.formItemPlaceholder' key instead."
        );
        this._placeholder = value;
    }

    get placeholder(): string {
        return this._placeholder;
    }

    /** @hidden */
    @Input()
    _editMode = false;

    /** Event emitted when the dragged file exits the dropzone. */
    @Output()
    readonly fileNameChanged = new EventEmitter<string>();

    /** @hidden */
    _fileNameValue: string;

    /** @hidden */
    _extension: string;

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
    private _placeholder: string;

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
