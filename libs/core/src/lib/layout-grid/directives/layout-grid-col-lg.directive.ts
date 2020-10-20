import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { LayoutGridColBase } from './layout-grid-col.base';
import { CSS_CLASS_NAME } from '../constants';

@Directive({
    selector: '[fdLayoutGridColLg]'
})
export class LayoutGridColLgDirective extends LayoutGridColBase implements OnChanges {

    /** Defines the width of the element on the layout grid for large screen devices. */
    @Input('fdLayoutGridColLg')
    numberOfColumns: number;

    /** @hidden */
    constructor(elementRef: ElementRef<HTMLElement>, renderer: Renderer2) {
        super(renderer, elementRef, CSS_CLASS_NAME.lgColSizePrefix);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }
}
