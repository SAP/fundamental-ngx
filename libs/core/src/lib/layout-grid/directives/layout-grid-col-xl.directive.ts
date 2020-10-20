import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { LayoutGridColBase } from './layout-grid-col.base';
import { CSS_CLASS_NAME } from '../constants';

@Directive({
    selector: '[fdLayoutGridColXl]'
})
export class LayoutGridColXlDirective extends LayoutGridColBase implements OnChanges {

    /** Defines the width of the element on the layout grid for extra-large screen devices. */
    @Input('fdLayoutGridColXl')
    numberOfColumns: number;

    /** @hidden */
    constructor(elementRef: ElementRef<HTMLElement>, renderer: Renderer2) {
        super(renderer, elementRef, CSS_CLASS_NAME.xlColSizePrefix);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }
}
