import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-user-menu-header]',
    host: {
        class: 'fd-user-menu__header'
    }
})
export class UserMenuHeaderDirective {}
