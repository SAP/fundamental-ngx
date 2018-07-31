import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html'
})
export class PopoverComponent {
    @Input() disabled: boolean = false;
    @Input() isDropdown: boolean = false;
    @Input() glyph: string;
    @Input() size: string;
    @Input() btnType: string = '';

    isOpen: boolean = false;

    close() {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }

    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.close();
    }

    @HostListener('document:click', ['$event'])
    onClickHandler(e: MouseEvent) {
        const target = e.target;
        if (this.eRef.nativeElement.contains(target)) {
            this.isOpen = !this.isOpen;
        } else {
            this.close();
        }
    }

    constructor(private eRef: ElementRef) {}
}
