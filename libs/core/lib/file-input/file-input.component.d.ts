import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * Tool to facilitate the input of files from the user.
 * It supports drag and drop, multiple input, max file size and more.
 * The drag events make it very easy to create and style elements like a dropzone.
 */
export declare class FileInputComponent implements ControlValueAccessor {
    /** @hidden */
    fdFileInputClass: boolean;
    /** @hidden */
    inputRef: ElementRef;
    /** Whether the file input is disabled. */
    disabled: boolean;
    /** Whether the file input should accept multiple files. */
    multiple: boolean;
    /** Accepted file extensions. Format: `'.png,.jpg'`. */
    accept: string;
    /** Whether the file input accepts drag and dropped files. */
    dragndrop: boolean;
    /** Max file size in bytes that the input will accept. */
    maxFileSize: number;
    /** Event fired when files are selected. Passed object is the array of files selected. */
    readonly onSelect: EventEmitter<File[]>;
    /** Event fired when some invalid files are selected. Passed object is the array of invalid files. */
    readonly onInvalidFiles: EventEmitter<File[]>;
    /** Event fired when the dragged file enters the component boundaries. */
    readonly onDragEnter: EventEmitter<void>;
    /** Event fired when the dragged file exits the component boundaries. */
    readonly onDragLeave: EventEmitter<void>;
    /** @hidden */
    onChange: Function;
    /** @hidden */
    onTouched: Function;
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    /** @hidden */
    writeValue(files: File[]): void;
    /** @hidden */
    selectHandler(event: File[]): void;
    /**
     * Opens the file selector.
     */
    open(): void;
    /**
     * Clears the files from the input.
     */
    clear(): void;
}
