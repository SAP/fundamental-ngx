import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-navbar-actions]',
    host: {
        class: 'fd-global-nav__actions'
    }
})
export class NavbarActionsDirective {}
