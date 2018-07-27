import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html'
})
export class PopoverComponent {
    @Input() id;

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
