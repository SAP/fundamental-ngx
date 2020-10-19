import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { LayoutGridColBase } from './layout-grid-col.base';
import { CSS_CLASS_NAME } from '../constants';

@Directive({
    selector: '[fdLayoutGridCol]'
})
export class LayoutGridColDirective extends LayoutGridColBase implements OnInit, OnChanges {
    @Input('fdLayoutGridCol')
    _numberOfColumns: number;

    // Whether or not the column should fill the remaining space.
    @Input()
    full = false;

    /** @hidden */
    constructor(public elementRef: ElementRef<HTMLElement>, renderer: Renderer2) {
        super(renderer, elementRef, CSS_CLASS_NAME.colSizePrefix);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();

        if (this.full) {
            this.elementRef.nativeElement.classList.add(CSS_CLASS_NAME.full);
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }
}
