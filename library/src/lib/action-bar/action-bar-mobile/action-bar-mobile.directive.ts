import { Directive } from '@angular/core';

/**
 * The action bar mobile component. This component should wrap all other action bar components, including the <fd-action-bar>.
 *
 * ```html
 * <div fd-action-bar-mobile>
 *     <div fd-action-bar>
 *     </div>
 * </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-mobile]'
})
export class ActionBarMobileDirective { }
