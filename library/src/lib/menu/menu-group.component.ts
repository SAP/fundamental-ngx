import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-menu-group',
    templateUrl: './menu-group.component.html',
    styles: [':host {display: block;}']
})
export class MenuGroupComponent {
    @HostBinding('class.fd-menu__group') true;
}
