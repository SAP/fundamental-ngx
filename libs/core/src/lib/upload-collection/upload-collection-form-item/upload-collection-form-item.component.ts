import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { NgIf } from '@angular/common';

@Component({
    selector: 'fd-upload-collection-form-item',
    host: { class: 'fd-upload-collection__form-item' },
    templateUrl: './upload-collection-form-item.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, FormControlModule, FormsModule, FdTranslatePipe]
})
export class UploadCollectionFormItemComponent implements ControlValueAccessor {
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
