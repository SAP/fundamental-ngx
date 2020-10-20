import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { LayoutGridColBase } from './layout-grid-col.base';
import { CSS_CLASS_NAME } from '../constants';

@Directive({
    selector: '[fdLayoutGridColMd]'
})
export class LayoutGridColMdDirective extends LayoutGridColBase implements OnChanges {

    /** Defines the width of the element on the layout grid for middle-size screen devices. */
    @Input('fdLayoutGridColMd')
    numberOfColumns: number;

    /** @hidden */
    constructor(elementRef: ElementRef<HTMLElement>, renderer: Renderer2) {
        super(renderer, elementRef, CSS_CLASS_NAME.mdColSizePrefix);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }
}
