import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdFileSelect]',
})
export class FileSelectDirective {

    @Input()
    private multiple: boolean = true;

    @Output()
    onFileSelect: EventEmitter<File[]> = new EventEmitter<File[]>();

    @HostBinding('attr.multiple')
    get multipleBinding(): string {
        return this.multiple ? '' : undefined;
    }

    @HostListener('change', ['$event'])
    onChange(event: Event): void {
        if (event.target instanceof HTMLInputElement) {
            const elRef: HTMLInputElement = (<HTMLInputElement>event.target);
            const files: FileList = elRef.files;
            const fileArray: File[] = Array.from(files);
            if (files.length) {
                this.onFileSelect.emit(fileArray);
            }
        }
    }
}
