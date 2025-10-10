import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-user-menu-user-name]',
    host: {
        class: 'fd-user-menu__user-name',
        '[class.fd-user-menu__user-name--truncate]': 'truncate()'
    }
})
export class UserMenuUserNameDirective {
    /** Whether the text should truncate with ellipsis. */
    truncate = input(false, { transform: booleanAttribute });
}
