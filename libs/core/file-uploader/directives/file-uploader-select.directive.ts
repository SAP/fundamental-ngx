import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

/**
 * Directive tool to facilitate interacting with a native file input element.
 */
@Directive({
    selector: '[fdFileSelect]',
    standalone: true
})
export class FileUploaderSelectDirective {
    /** Whether the input should accept multiple file selections. */
    @Input()
    private multiple = true;

    /** Event emitted when files are selected. */
    @Output()
    readonly fileSelected = new EventEmitter<File[]>();

    /** @ignore */
    @HostBinding('attr.multiple')
    get multipleBinding(): boolean | undefined {
        return this.multiple ? true : undefined;
    }

    /** @ignore */
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
