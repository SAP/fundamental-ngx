import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * This component holds the right-aligned action buttons for the action bar.
 */
@Component({
    selector: 'fd-action-bar-actions',
    templateUrl: './action-bar-actions.component.html'
})
export class ActionBarActionsComponent extends AbstractFdNgxClass {
    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-action-bar__actions');
    }

    /** @hidden */
    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
