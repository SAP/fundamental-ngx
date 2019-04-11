import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * The left-aligned back button for the action bar.
 */
@Component({
    selector: 'fd-action-bar-back',
    templateUrl: './action-bar-back.component.html'
})
export class ActionBarBackComponent extends AbstractFdNgxClass {
    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-action-bar__back');
    }

    /** @hidden */
    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
