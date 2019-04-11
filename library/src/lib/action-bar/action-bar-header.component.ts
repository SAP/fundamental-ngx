import { Component, ElementRef, Inject } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * The action bar header, which contains the action bar's title and description components.
 */
@Component({
    selector: 'fd-action-bar-header',
    templateUrl: './action-bar-header.component.html'
})
export class ActionBarHeaderComponent extends AbstractFdNgxClass {
    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-action-bar__header');
    }

    /** @hidden */
    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
