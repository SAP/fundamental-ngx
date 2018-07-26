import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-menu-item',
    templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
    @Input() url;

    @Input() routerLink;
}
