import { Directive, Component, Input, HostListener } from '@angular/core';

@Component({
    selector: 'fd-dropdown',
    host: {
        class: 'fd-dropdown'
    },
    templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
    @Input() id = 123;

    @Input() disabled;

    @Input() glyph;

    @Input() size;

    @Input() isContextualMenu: boolean = false;

    isOpen = false;

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(evt: KeyboardEvent) {
        if (this.isOpen) {
            this.close();
        }
    }
}
