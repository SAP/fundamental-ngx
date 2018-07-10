import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-side-nav-link',
    templateUrl: './side-navigation-link.component.html'
})
export class SideNavigationLinkComponent {
    @Input() url: string;

    @Input() hasSublist: boolean;

    sublistIsOpen: boolean = false;
}
