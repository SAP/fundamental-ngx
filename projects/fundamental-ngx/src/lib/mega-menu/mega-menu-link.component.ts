import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-mega-menu-link',
    templateUrl: './mega-menu-link.component.html'
})
export class MegaMenuLinkComponent {
    @Input()
    hasSublist: boolean;

    sublistIsOpen = false;

    onKeypressHandler(event) {
        if (this.hasSublist && (event.code === 'Space' || event.code === 'Enter')) {
            event.preventDefault();
            this.sublistIsOpen = !this.sublistIsOpen;
        }
    }
}
