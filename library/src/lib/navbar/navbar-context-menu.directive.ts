import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-navbar-context-menu]',
    host: {
        class: 'fd-global-nav__context-menu'
    }
})
export class NavbarContextMenuDirective {}
