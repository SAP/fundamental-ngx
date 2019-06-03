import { Directive } from '@angular/core';

/**
 * List item level actions such as add, remove, delete, sort, etc.
 *
 * ```html
 * <fd-list>
 *    <li fd-list-item>List item 1
 *        <fd-list-action>
 *            <button fd-button [options]="'light'" [glyph]="'edit'"></button>
 *       </fd-list-action>
 *    </li>
 * </fd-list> 
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-list-action',
    host: {
        class: 'fd-list-group__action'
    }
})
export class ListActionDirective {}
