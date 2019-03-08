import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    styles: [':host {display: block;}']
})
export class MenuComponent {
    @HostBinding('class.fd-menu') true;
}
