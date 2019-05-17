import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Panels are used to encapsulate part of the content, form elements, lists, collections, etc., on a page.
 */
@Component({
    selector: 'fd-panel',
    templateUrl: './panel.component.html',
    host: {
        '[class.fd-has-display-block]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class PanelComponent extends AbstractFdNgxClass {

    /** @Input Column span for the panel in the grid system */
    @Input()
    columnSpan: number;

    /** @Input Background image of the panel. */
    @Input()
    backgroundImage: string;

    /** @hidden */
    @HostBinding('class.fd-panel')
    fdPanelClass: boolean = true;

    /** @hidden */
    _setProperties() {
        if (this.columnSpan) {
            this._addClassToElement('fd-has-grid-column-span-' + this.columnSpan);
        }
        if (this.backgroundImage) {
            this._addStyleToElement('background-image', 'url("' + this.backgroundImage + '")');
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
