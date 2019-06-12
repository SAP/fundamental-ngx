import { Directive } from '@angular/core';

/**
 * The action bar title component.
 *
 * ```html
 * <fd-action-bar>
 *     <div fd-action-bar-header>
 *         <h1 fd-action-bar-title>Page Title</h1>
 *     </div>
 * <fd-action-bar>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-title]',
    host: {
        class: 'fd-action-bar__title'
    }
})
export class ActionBarTitleDirective {}
