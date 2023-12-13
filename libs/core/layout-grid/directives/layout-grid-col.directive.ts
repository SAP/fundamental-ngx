import { BooleanInput, NumberInput, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { CSS_CLASS_NAME, GRID_COLUMNS_NUMBER } from '../constants';

@Directive({
    selector: '[fd-layout-grid-col], [fdLayoutGridCol]',
    standalone: true
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

    /** @ignore */
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

    /** @ignore */
    @Input()
    class: string;

    /** @ignore */
    private _colGrow: boolean;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef) {}

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
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

    /** @ignore */
    getCssClassWithColWidth(classPrefix: string, colWidth: NumberInput): string | null {
        if (!colWidth) {
            return null;
        }

        const col = coerceNumberProperty(colWidth);

        return col <= GRID_COLUMNS_NUMBER && col >= 1 ? classPrefix + col : null;
    }
}
