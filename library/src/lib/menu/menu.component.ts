import { Component } from '@angular/core';

@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    host: {
        class: 'fd-menu'
    },
    styles: [':host {display: block;}']
})
export class MenuComponent {}
