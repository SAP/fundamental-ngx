import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * Label component, used to indicate status, without any background or border
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-label]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./label.component.scss']
})
export class LabelComponent extends AbstractFdNgxClass {
    /** Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label. */
    @Input() status: string = '';

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-label');
        if (this.status) {
            this._addClassToElement('fd-label--' + this.status);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
