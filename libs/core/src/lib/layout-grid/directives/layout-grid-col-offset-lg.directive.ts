import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { LayoutGridColBase } from './layout-grid-col.base';
import { CSS_CLASS_NAME } from '../constants';

@Directive({
    selector: '[fdLayoutGridColOffsetLg]'
})
export class LayoutGridColOffsetLgDirective extends LayoutGridColBase implements OnChanges {

    /** Defines the offset width of the element on the layout grid for large screen devices. */
    @Input('fdLayoutGridColOffsetLg')
    numberOfColumns: number;

    /** @hidden */
    constructor(elementRef: ElementRef<HTMLElement>, renderer: Renderer2) {
        super(renderer, elementRef, CSS_CLASS_NAME.lgColOffsetPrefix);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }
}
