import { Directive, Input, ElementRef } from '@angular/core';

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
export class IconDirective {
    private _elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this._elementRef = elementRef;
        this._addClassToIcon(BASE_ICON_CLASS);
        this._setProperties();
    }
    @Input() glyph;

    @Input() size: IconSize = '';

    _addClassToIcon(classname: string) {
        (this._elementRef.nativeElement as HTMLElement).classList.add(classname);
    }

    ngOnInit() {
        this._setProperties();
    }

    _setProperties() {
        if (this.glyph) {
            this._addClassToIcon(PREFIX_ICON_CLASS + this.glyph);
        }

        if (this.size) {
            this._addClassToIcon(PREFIX_ICON_CLASS + this.size);
        }
    }

    ngOnChanges() {
        this._setProperties();
    }
}
