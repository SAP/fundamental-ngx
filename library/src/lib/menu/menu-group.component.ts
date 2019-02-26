import { Component } from '@angular/core';

@Component({
    selector: 'fd-menu-group',
    templateUrl: './menu-group.component.html',
    host: {
        class: 'fd-menu__group'
    },
    styles: [':host {display: block;}']
})
export class MenuGroupComponent {}
