import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-mega-menu-link',
    templateUrl: './mega-menu-link.component.html'
})
export class MegaMenuLinkComponent {
    @Input() url: string;

    @Input() hasSublist: boolean;

    sublistIsOpen = false;
}
