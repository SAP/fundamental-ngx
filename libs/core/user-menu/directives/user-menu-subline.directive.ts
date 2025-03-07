import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-user-menu-subline]',
    host: {
        class: 'fd-user-menu__subline'
    }
})
export class UserMenuSublineDirective {}
