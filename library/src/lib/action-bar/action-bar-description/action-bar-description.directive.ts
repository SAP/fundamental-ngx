import { Directive } from '@angular/core';

/**
 * The action bar description.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-header>
 *         <div fd-action-bar-description>Page Description</div>
 *     </div>
 * <div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-description]'
})
export class ActionBarDescriptionDirective {}
