import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { CSS_CLASS_NAME, GRID_COLUMNS_NUMBER } from '../constants';
import { applyCssClass } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fd-layout-grid-col], [fdLayoutGridCol]'
})
export class LayoutGridColDirective implements CssClassBuilder, OnInit, OnChanges {
    /** Defines the width of the element on the layout grid. */
    @Input()
    fdLayoutGridCol: NumberInput;

    /** Weather the column should take all available width */
    @Input()
    set colGrow(value: BooleanInput) {
        this._colGrow = coerceBooleanProperty(value);
    }

    /** @hidden */
    get colGrow(): boolean {
        return this._colGrow;
    }

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
    private _colGrow: boolean;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            CSS_CLASS_NAME.col,
            this.colGrow ? CSS_CLASS_NAME.colGrow : '',
            this.getCssClassWithColWidth(CSS_CLASS_NAME.colSizePrefix, this.fdLayoutGridCol),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.mdColSizePrefix, this.colMd),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.lgColSizePrefix, this.colLg),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.xlColSizePrefix, this.colXl),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.colOffsetPrefix, this.colOffset),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.mdColOffsetPrefix, this.colOffsetMd),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.lgColOffsetPrefix, this.colOffsetLg),
            this.getCssClassWithColWidth(CSS_CLASS_NAME.xlColOffsetPrefix, this.colOffsetXl),
            this.class
        ].filter((v): v is string => !!v);
    }

    /** @hidden */
    getCssClassWithColWidth(classPrefix: string, colWidth: NumberInput): string | null {
        if (!colWidth) {
            return null;
        }

        const col = coerceNumberProperty(colWidth);

        return col <= GRID_COLUMNS_NUMBER && col >= 1 ? classPrefix + col : null;
    }
}
