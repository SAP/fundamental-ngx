import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Host,
    Input,
    isDevMode,
    OnInit,
    Optional,
    Output,
    Self,
    SkipSelf
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { ContentDensity } from '@fundamental-ngx/core/utils';
import { FormStates, Nullable } from '@fundamental-ngx/core/shared';
import { BaseInput, FormField, FormFieldControl } from '@fundamental-ngx/platform/shared';

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
export class PlatformFileUploaderComponent extends BaseInput implements OnInit {
    /** Button value */
    @Input()
    buttonLabel: string;

    /** Value for input element. */
    @Input()
    buttonAriaLabel: Nullable<string>;

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

    /**
     * content Density of element: 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
    }
    get contentDensity(): ContentDensity {
        return this._contentDensity || 'cozy';
    }

    /** Specifies number of files to allow to select */
    @Input()
    fileLimit: number;

    /**
     * @deprecated
     * set state of individual checkbox. Used by CBG to set checkbox states */
    @Input()
    get stateType(): FormStates {
        if (isDevMode()) {
            console.warn('"stateType" is deprecated. Use "state" instead');
        }
        return super.state;
    }

    set stateType(state: FormStates) {
        if (isDevMode()) {
            console.warn('"stateType" is deprecated. Use "state" instead');
        }
        super.state = state;
    }

    /** Event emitted when valid file is uploded. */
    @Output()
    selectionChange: EventEmitter<FileUploaderSelectionChangeEvent> = new EventEmitter<FileUploaderSelectionChangeEvent>();
    /** Event emitted when invalid file is uploded. */
    @Output()
    invalidFileChange: EventEmitter<FileUploaderInvalidChangeEvent> = new EventEmitter<FileUploaderInvalidChangeEvent>();

    /** Files upladed hidden field to store file data */
    files: File[];

    /**
     * Control Value Accessor
     */
    writeValue(value: File): void {
        super.writeValue(value);
    }

    /** Sets value file data*/
    @Input()
    get value(): File {
        return super.getValue();
    }
    set value(value: File) {
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

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
    }

    /** Handle valid file changes event handler */
    handleFileChange(fileArray: File[]): void {
        this.files = fileArray;
        const event = new FileUploaderSelectionChangeEvent(this, this.files);
        this.selectionChange.emit(event);
    }

    /** Handle invalid file changes event handler */
    handleInvalidFiles(fileArray: File[]): void {
        this.files = fileArray;
        const event = new FileUploaderInvalidChangeEvent(this, this.files);
        this.invalidFileChange.emit(event);
    }
}
