import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-upload-collection-form-item',
    host: { class: 'fd-upload-collection__form-item' },
    templateUrl: './upload-collection-form-item.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FormControlComponent, FormsModule, FdTranslatePipe]
})
export class UploadCollectionFormItemComponent implements ControlValueAccessor {
    /** @ignore */
    @Input()
    _editMode = false;

    /** Event emitted when the dragged file exits the dropzone. */
    @Output()
    readonly fileNameChanged = new EventEmitter<string>();

    /** @ignore */
    _fileNameValue: string;

    /** @ignore */
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

    /** @ignore */
    onChange: (value: string) => void = () => {};

    /** @ignore */
    onTouched = (): void => {};

    /** @ignore */
    writeValue(value: string): void {
        this.fileName = value;
    }

    /** @ignore */
    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    /** @ignore */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
