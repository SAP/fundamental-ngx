import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The action bar description.
 *
 * ```html
 * <fd-action-bar>
 *     <fd-action-bar-header>
 *         <fd-action-bar-description>Page Description</fd-action-bar-description>
 *     </fd-action-bar-header>
 * <fd-action-bar>
 * ```
 */
@Component({
    selector: 'fd-action-bar-description',
    templateUrl: './action-bar-description.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ActionBarDescriptionComponent {}
