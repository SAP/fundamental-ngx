import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { LayoutGridColBase } from './layout-grid-col.base';
import { CSS_CLASS_NAME } from '../constants';

@Directive({
    selector: '[fdLayoutGridCol]'
})
export class LayoutGridColDirective extends LayoutGridColBase implements OnInit, OnChanges {

    /** Defines the width of the element on the layout grid. */
    @Input('fdLayoutGridCol')
    numberOfColumns: number;

    /** @hidden */
    constructor(elementRef: ElementRef<HTMLElement>, renderer: Renderer2) {
        super(renderer, elementRef, CSS_CLASS_NAME.colSizePrefix);
    }

    /** @hidden */
    ngOnInit(): void {
        this._addColClass();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }

    /** @hidden Adds base grid column class */
    private _addColClass(): void {
        if (!this._elementRef.nativeElement.classList.contains(CSS_CLASS_NAME.col)) {
            this._renderer.addClass(this._elementRef.nativeElement, CSS_CLASS_NAME.col);
        }
    }
}
