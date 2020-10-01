import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { LayoutGridColBase } from './layout-grid-col.base';
import { CSS_CLASS_NAME } from '../constants';

@Directive({
    selector: '[fdLayoutGridColOffset]'
})
export class LayoutGridColOffsetDirective extends LayoutGridColBase implements OnInit, OnChanges {

    @Input('fdLayoutGridColOffset')
    _numberOfColumns: number;

    /** @hidden */
    constructor(elementRef: ElementRef<HTMLElement>, renderer: Renderer2) {
        super(renderer, elementRef, CSS_CLASS_NAME.colOffsetPrefix);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }

}
