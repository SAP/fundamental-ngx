import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'fd-popover',
    host: {
        class: 'fd-popover'
    },
    templateUrl: './popover.component.html'
})
export class PopoverComponent {
    @Input() id = 123;

    @Input() disabled;

    isOpen:boolean = false;

    close() {
        if (this.isOpen) {
            this.isOpen = false;
        } 
    }

    @HostListener('document:keydown.escape', ['$event'])
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
