import { Directive, Input, ElementRef, Inject } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/** The base class for the icon component */
//const BASE_ICON_CLASS = 'sap-icon';

/** Prefix for icon prop classes */
//const PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';

@Directive({
    selector: 'fd-icon',
    host: {
        role: 'presentation'
    }
})
export class IconDirective extends AbstractFdNgxClass {
    @Input() glyph;

    @Input() glyphGroup: 'sap' | 'ariba' = 'sap';

    @Input() size: string = '';

    _setProperties() {

        let prefixClass = this.glyphGroup + '-icon--';

        if (this.glyph) {
            this._addClassToElement(prefixClass + this.glyph);
        }

        if (this.size) {
            this._addClassToElement(prefixClass + this.size);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
