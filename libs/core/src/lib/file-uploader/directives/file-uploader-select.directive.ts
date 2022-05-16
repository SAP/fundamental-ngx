import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding } from '@angular/core';

/**
 * Directive tool to facilitate interacting with a native file input element.
 */
@Directive({
    selector: '[fdFileSelect]'
})
export class FileUploaderSelectDirective {
    /** Whether the input should accept multiple file selections. */
    @Input()
    private multiple = true;

    /** Event emitted when files are selected. */
    @Output()
    readonly fileSelected = new EventEmitter<File[]>();

    /** @hidden */
    @HostBinding('attr.multiple')
    get multipleBinding(): boolean | undefined {
        return this.multiple ? true : undefined;
    }

    /** @hidden */
    @HostListener('change', ['$event'])
    onChange(event: Event): void {
        if (event.target instanceof HTMLInputElement) {
            const elRef = <HTMLInputElement>event.target;
            const files = elRef.files;
            if (files?.length) {
                const fileArray = Array.from(files);
                this.fileSelected.emit(fileArray);
            }
        }
    }
}
