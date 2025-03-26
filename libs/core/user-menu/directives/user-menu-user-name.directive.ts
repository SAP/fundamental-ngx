import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-user-menu-user-name]',
    host: {
        class: 'fd-user-menu__user-name'
    }
})
export class UserMenuUserNameDirective {}
