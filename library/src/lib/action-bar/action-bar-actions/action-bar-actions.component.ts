import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * This component holds the right-aligned action buttons for the action bar.
 *
 * ```html
 * <fd-action-bar>
 *     <fd-action-bar-actions>
 *         <button fd-button [fdType]="'primary'">Cancel</button>
 *         <button fd-button [fdType]="'main'">Save</button>
 *     </fd-action-bar-actions>
 * <fd-action-bar>
 * ```
 */
@Component({
    selector: 'fd-action-bar-actions',
    templateUrl: './action-bar-actions.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ActionBarActionsComponent extends AbstractFdNgxClass {
    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-action-bar__actions');
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
