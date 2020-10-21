import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { CSS_CLASS_NAME, GRID_COLUMNS_NUMBER } from '../constants';
import { applyCssClass } from '../../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../../utils/interfaces/css-class-builder.interface';

@Directive({
    selector: '[fd-layout-grid-col], [fdLayoutGridCol]'
})
export class LayoutGridColDirective implements CssClassBuilder, OnInit, OnChanges {

    /** Defines the width of the element on the layout grid. */
    @Input()
    fdLayoutGridCol: number;

    /** Defines the width of the element on the layout grid for middle-size screen devices. */
    @Input()
    colMd: number;

    /** Defines the width of the element on the layout grid for large screen devices. */
    @Input()
    colLg: number;

    /** Defines the width of the element on the layout grid for extra-large screen devices. */
    @Input()
    colXl: number;

    /** Defines the offset width of the element on the layout grid. */
    @Input()
    colOffset: number;

    /** Defines the offset width of the element on the layout grid for middle-sized screen devices. */
    @Input()
    colOffsetMd: number;

    /** Defines the offset width of the element on the layout grid for large screen devices. */
    @Input()
    colOffsetLg: number;

    /** Defines the offset width of the element on the layout grid for extra-large screen devices. */
    @Input()
    colOffsetXl: number;

    /** @hidden */
    @Input()
    class: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            CSS_CLASS_NAME.col,
            this.getCssClassWithColWidth(CSS_CLASS_NAME.colSizePrefix, this.fdLayoutGridCol),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.mdColSizePrefix, this.colMd),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.lgColSizePrefix, this.colLg),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.xlColSizePrefix, this.colXl),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.colOffsetPrefix, this.colOffset),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.mdColOffsetPrefix, this.colOffsetMd),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.lgColOffsetPrefix, this.colOffsetLg),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.xlColOffsetPrefix, this.colOffsetXl),
            this.class
        ];
    }

    /** @hidden */
    getCssClassWithColWidth(classPrefix: string, colWidth: number): string {
        return colWidth <= GRID_COLUMNS_NUMBER && colWidth >= 1
            ? classPrefix + colWidth
            : null;
    }
}
