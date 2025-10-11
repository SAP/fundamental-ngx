import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-user-menu-subline]',
    host: {
        class: 'fd-user-menu__subline',
        '[class.fd-user-menu__subline--truncate]': 'truncate()'
    }
})
export class UserMenuSublineDirective {
    /** Whether the text should truncate with ellipsis. */
    truncate = input(false, { transform: booleanAttribute });
}
