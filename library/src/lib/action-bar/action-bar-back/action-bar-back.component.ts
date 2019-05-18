import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * The left-aligned back button for the action bar.
 *
 * ```html
 * <fd-action-bar>
 *     <fd-action-bar-back>
 *         <button aria-label="back" fd-button [fdType]="'light'" [compact]="true" [glyph]="'nav-back'"></button>
 *     </fd-action-bar-back>
 * <fd-action-bar>
 * ```
 */
@Component({
    selector: 'fd-action-bar-back',
    templateUrl: './action-bar-back.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ActionBarBackComponent extends AbstractFdNgxClass {
    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-action-bar__back');
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
