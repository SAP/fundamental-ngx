import { Directive, HostBinding } from '@angular/core';

/**
 * The directive that represents the menu title.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-title]'
})
export class MenuTitleDirective {
    /** @hidden */
    @HostBinding('class')
    elementClass = 'fd-menu__title';
}
