import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    SkipSelf
} from '@angular/core';
import { ControlContainer, NgControl, NgForm, FormsModule } from '@angular/forms';

import { BaseInput, PlatformFormFieldControl, PlatformFormField } from '@fundamental-ngx/platform/shared';
import {
    ContentDensityModule,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';

export class FileUploaderInvalidChangeEvent {
    /**
     * File Uploader invalid change event
     * @param source File Uploader component
     * @param payload Value
     */
    constructor(
        public source: PlatformFileUploaderComponent,
        public payload: File[] // Contains selected item
    ) {}
}

export class FileUploaderSelectionChangeEvent {
    /**
     * File Uploader invalid change event
     * @param source File Uploader component
     * @param payload Value
     */
    constructor(
        public source: PlatformFileUploaderComponent,
        public payload: File[] // Contains selected item
    ) {}
}

@Component({
    selector: 'fdp-file-uploader',
    templateUrl: './platform-file-uploader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()],
    standalone: true,
    imports: [FileUploaderModule, FormsModule, ContentDensityModule]
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

    /** Specifies number of files to allow to select */
    @Input()
    fileLimit: number;

    /** Event emitted when valid file is uploded. */
    @Output()
    selectionChange: EventEmitter<FileUploaderSelectionChangeEvent> =
        new EventEmitter<FileUploaderSelectionChangeEvent>();
    /** Event emitted when invalid file is uploded. */
    @Output()
    invalidFileChange: EventEmitter<FileUploaderInvalidChangeEvent> =
        new EventEmitter<FileUploaderInvalidChangeEvent>();

    /** Files upladed hidden field to store file data */
    files: File[];

    /** Sets value file data*/
    @Input()
    set value(value: File) {
        super.setValue(value);
    }

    get value(): File {
        return super.getValue();
    }
    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        elementRef: ElementRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() controlContainer: ControlContainer,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl,
        readonly contentDensityObserver: ContentDensityObserver
    ) {
        super(_cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);
    }

    /**
     * Control Value Accessor
     */
    writeValue(value: File): void {
        super.writeValue(value);
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
