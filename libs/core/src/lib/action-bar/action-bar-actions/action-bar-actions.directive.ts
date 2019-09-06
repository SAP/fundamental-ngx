import { Directive } from '@angular/core';

/**
 * This component holds the right-aligned action buttons for the action bar.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-actions>
 *         <button fd-button [fdType]="'primary'">Cancel</button>
 *         <button fd-button [fdType]="'main'">Save</button>
 *     </div>
 * </div>
 * ```
 */

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-actions]',
    host: {
        class: 'fd-action-bar__actions'
    }
})
export class ActionBarActionsDirective {}
