import { EventEmitter } from '@angular/core';
/**
 * Directive tool to facilitate interacting with a native file input element.
 */
export declare class FileSelectDirective {
    /** Whether the input should accept multiple file selections. */
    private multiple;
    /** Event emitted when files are selected. */
    readonly onFileSelect: EventEmitter<File[]>;
    /** @hidden */
    readonly multipleBinding: string;
    /** @hidden */
    onChange(event: Event): void;
}
