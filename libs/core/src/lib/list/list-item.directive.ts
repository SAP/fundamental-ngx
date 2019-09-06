import { Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a list item.
 * The list item can contain plain text, links or actions.
 * 
 * ```html
 * <ul fd-list>
 *    <li fd-list-item>
 *        List item 1
 *    </li>
 * </ul>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-item]',
    host: {
        'class': 'fd-list-group__item'
    }
})
export class ListItemDirective {}
