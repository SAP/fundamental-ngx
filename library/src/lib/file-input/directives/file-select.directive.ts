import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding, Host, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';

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

    constructor(@Optional() @Host() private model: NgModel) {
    }

    @HostListener('change', ['$event'])
    onChange(event: Event): void {
        if (event.target instanceof HTMLInputElement) {
            const elRef: HTMLInputElement = (<HTMLInputElement>event.target);
            const files: FileList = elRef.files;
            const fileArray: File[] = Array.from(files);
            if (files.length) {
                this.model ? this.model.update.emit(fileArray) : this.onFileSelect.emit(fileArray);
            }
        }
    }
}
