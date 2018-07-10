import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'fd-dropdown',
    host: {
        class: 'fd-dropdown',
        '(document:click)': 'documentClick($event)'
    },
    templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
    @Input() id = 123;

    @Input() disabled;

    @Input() glyph;

    @Input() size;

    @Input() buttonText: string = '';

    @Input() isContextualMenu: boolean = false;

    @Input() noBorder: boolean = false;

    isOpen = false;

    dropdownClicked() {
        if (this.isOpen) {
            this.close();
        } else {
            this.isOpen = true;
        }
    }

    close() {
        this.isOpen = false;
    }

    documentClick($event) {
        const target = $event.target;
        if (this.eRef.nativeElement.contains(target)) {
            this.dropdownClicked();
        } else {
            this.close();
        }
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(evt: KeyboardEvent) {
        if (this.isOpen) {
            this.close();
        }
    }

    constructor(private eRef: ElementRef) {}
}
