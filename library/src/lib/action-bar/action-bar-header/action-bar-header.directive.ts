import { Directive } from '@angular/core';

/**
 * The action bar header, which contains the action bar's title and description components.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-header>
 *     </div>
 * </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-header]',
    host: {
        class: 'fd-action-bar__header'
    }
})
export class ActionBarHeaderDirective {}
