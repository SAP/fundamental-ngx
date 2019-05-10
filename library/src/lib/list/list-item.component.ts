import { Component, HostBinding } from '@angular/core';

/**
 * The component that represents a list item.
 * The list item can contain plain text, links or actions.
 * 
 * ```html
 * <fd-list>
 *    <li fd-list-item>
 *        List item 1
 *    </li>
 * </fd-list> 
 * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:component-selector
    selector: '[fd-list-item]',
    template: `
        <ng-content></ng-content>
    `
})
export class ListItemComponent {
    /** @hidden */
    @HostBinding('class.fd-list-group__item')
    fdListItemClass: boolean = true;
}
