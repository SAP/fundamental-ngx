import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * The action bar header, which contains the action bar's title and description components.
 *
 * ```html
 * <fd-action-bar>
 *     <fd-action-bar-header>
 *     </fd-action-bar-header>
 * <fd-action-bar>
 * ```
 */
@Component({
    selector: 'fd-action-bar-header',
    templateUrl: './action-bar-header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ActionBarHeaderComponent extends AbstractFdNgxClass {
    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-action-bar__header');
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
