import { SelectionModel } from '@angular/cdk/collections';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Host,
    Input,
    Optional,
    Output,
    Self,
    SkipSelf
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { stateType } from '@fundamental-ngx/core';
import { BaseInput } from '../base.input';

import { ContentDensity, FormFieldControl } from '../form-control';
import { FormField } from '../form-field';

export class FileUploaderInvalidChangeEvent {
    constructor(
        public source: PlatformFileUploaderComponent,
        public payload: File[] // Contains selected item
    ) {}
}

export class FileUploaderSelectionChangeEvent {
    constructor(
        public source: PlatformFileUploaderComponent,
        public payload: File[] // Contains selected item
    ) {}
}

@Component({
    selector: 'fdp-file-uploader',
    templateUrl: './platform-file-uploader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformFileUploaderComponent extends BaseInput {
    /** @hidden state of checkbox, coming from CBG */
    private _state: stateType;

    /** button value */
    @Input()
    buttonLabel: string;

    /** value for input element. */
    @Input()
    buttonAriaLabel: string;

    /** Whether the file input accepts drag and dropped files. */
    @Input()
    dragndrop = true;

    /** Max file size in bytes that the input will accept. */
    @Input()
    maxFileSize = '';

    /** Min file size in bytes that the input will accept. */
    @Input()
    minFileSize = '';

    /** Whether the file input should accept multiple files. */
    @Input()
    multiple = true;

    /** Accepted file extensions. Format: `'.png,.jpg'`. */
    @Input()
    accept: string;

    /** content Density of element. cozy | compact */
    @Input()
    contentDensity: ContentDensity = 'cozy';

    /** specifies number of files to allow to select */
    @Input()
    fileLimit: number;

    /** set state of individual component.Used by CBG to set checkbox states */
    @Input()
    get stateType(): stateType {
        if (this._state) {
            return this._state;
        }
        return this.status; // return parent form field status.
    }

    set stateType(state: stateType) {
        this._state = state;
    }

    /** Event emitted when valid file is uploded. */
    @Output()
    selectionChange: EventEmitter<FileUploaderSelectionChangeEvent> = new EventEmitter<FileUploaderSelectionChangeEvent>();
    /** Event emitted when invalid file is uploded. */
    @Output()
    invalidFileChange: EventEmitter<FileUploaderInvalidChangeEvent> = new EventEmitter<FileUploaderInvalidChangeEvent>();

    /** files upladed hidden field to store file data */
    files: File[];

    /**
     * Control Value Accessor
     */
    writeValue(value: File): void {
        if (value) {
            super.writeValue(value);
        }
    }

    /**sets value file data*/
    @Input()
    get value(): any {
        return super.getValue();
    }
    set value(value: any) {
        super.setValue(value);
    }

    constructor(
        protected _cd: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(_cd, ngControl, ngForm, formField, formControl);
    }

    handleFileChange(fileArray: File[]): void {
        this.files = fileArray;
        const event = new FileUploaderSelectionChangeEvent(this, this.files);
        this.selectionChange.emit(event);
    }

    handleInvalidFiles(fileArray: File[]): void {
        this.files = fileArray;
        const event = new FileUploaderInvalidChangeEvent(this, this.files);
        this.invalidFileChange.emit(event);
    }
}
