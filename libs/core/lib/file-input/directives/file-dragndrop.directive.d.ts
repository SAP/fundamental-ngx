import { EventEmitter } from '@angular/core';
/**
 * Directive that handles the drag and drop feature of the file input.
 */
export declare class FileDragndropDirective {
    /** Whether multiple files can be dropped at once. */
    multiple: boolean;
    /** Accepted file extensions. Format: `'.png,.jpg'`. */
    accept: string;
    /** Whether selecting of new files is disabled. */
    disabled: boolean;
    /** Whether drag and drop is enabled. Disables this directive. */
    dragndrop: boolean;
    /** Event emitted when files are selected. Passes back an array of files. */
    readonly onFileChange: EventEmitter<File[]>;
    /** Event emitted when invalid files are selected. Passes back an array of files. */
    readonly onInvalidFiles: EventEmitter<File[]>;
    /** Event emitted when the dragged file enters the dropzone. */
    readonly onDragEnter: EventEmitter<void>;
    /** Event emitted when the dragged file exits the dropzone. */
    readonly onDragLeave: EventEmitter<void>;
    private elementStateCounter;
    /** @hidden */
    onDragover(event: any): void;
    /** @hidden */
    onDragenter(): void;
    /** @hidden */
    onDragleave(event: any): void;
    /** @hidden */
    onDrop(event: any): void;
}
