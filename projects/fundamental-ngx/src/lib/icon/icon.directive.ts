import { Directive, Input, ElementRef, Inject } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

export type IconSize = 's' | '' | 'm' | 'l' | 'xl';

/** The base class for the icon component */
const BASE_ICON_CLASS = 'sap-icon';

/** Prefix for icon prop classes */
const PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';

@Directive({
    selector: 'fd-icon',
    host: {
        role: 'presentation'
    }
})
export class IconDirective extends AbstractCustomClassManager {
    @Input() glyph;

    @Input() size: IconSize = '';

    _setProperties() {
        if (this.glyph) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.glyph);
        }

        if (this.size) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.size);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
