import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[fdFileDragnDrop]'
})
export class FileDragndropDirective {

    @Output()
    onFileChange: EventEmitter<File[]> = new EventEmitter<File[]>();

    @Output()
    onInvalidFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

    @Output()
    onDragEnter: EventEmitter<null> = new EventEmitter<null>();

    @Output()
    onDragLeave: EventEmitter<null> = new EventEmitter<null>();

    @Input()
    multiple: boolean = true;

    @Input()
    accept: string;

    @Input()
    disabled: boolean = false;

    @Input()
    dragndrop: boolean = true;

    private elementStateCounter: number = 0;

    @HostListener('dragover', ['$event'])
    public onDragover(event) {
        if (this.dragndrop) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    @HostListener('dragenter', [])
    public onDragenter() {
        ++this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 1) {
            this.onDragEnter.emit();
        }
    }

    @HostListener('dragleave', ['$event'])
    public onDragleave(event) {
        --this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 0) {
            event.preventDefault();
            event.stopPropagation();
            this.onDragLeave.emit();
        }
    }

    @HostListener('drop', ['$event'])
    public onDrop(event) {
        this.elementStateCounter = 0;

        if (!this.dragndrop || this.disabled) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const rawFiles = event.dataTransfer.files;
        const files: File[] = Array.from(rawFiles);

        if (!this.multiple && files.length > 1) {
            this.onInvalidFiles.emit(files);
            return;
        }

        const valid_files: File[] = [];
        const invalid_files: File[] = [];
        if (files.length > 0) {
            if (!this.accept) {
                files.forEach((file: File) => {
                    valid_files.push(file);
                });
            } else {
                const allowed_extensions = this.accept.toLocaleLowerCase().replace(/[\s.]/g, '').split(',');
                files.forEach((file: File) => {
                    const ext = file.name.split('.')[file.name.split('.').length - 1];
                    if (allowed_extensions.lastIndexOf(ext) !== -1) {
                        valid_files.push(file);
                    } else {
                        invalid_files.push(file);
                    }
                });
            }
            this.onFileChange.emit(valid_files);
            if (invalid_files.length > 0) {
                this.onInvalidFiles.emit(invalid_files);
            }
        }
    }
}
