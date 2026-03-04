import { Directive } from '@angular/core';

/**
 * The directive that represents the menu title.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-menu-content]',
    host: {
        class: 'fd-menu__content'
    }
})
export class MenuContentDirective {}
