import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { booleanAttribute, computed, Directive, ElementRef, inject, input } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { CSS_CLASS_NAME, GRID_COLUMNS_NUMBER } from '../constants';

@Directive({
    selector: '[fd-layout-grid-col], [fdLayoutGridCol]',
    host: {
        '[class]': '_cssClass()'
    }
})
export class LayoutGridColDirective implements HasElementRef {
    /** Defines the width of the element on the layout grid. */
    readonly fdLayoutGridCol = input<NumberInput>();

    /** Weather the column should take all available width */
    readonly colGrow = input(false, { transform: booleanAttribute });

    /** Defines the width of the element on the layout grid for middle-size screen devices. */
    readonly colMd = input<number>();

    /** Defines the width of the element on the layout grid for large screen devices. */
    readonly colLg = input<number>();

    /** Defines the width of the element on the layout grid for extra-large screen devices. */
    readonly colXl = input<number>();

    /** Defines the offset width of the element on the layout grid. */
    readonly colOffset = input<number>();

    /** Defines the offset width of the element on the layout grid for middle-sized screen devices. */
    readonly colOffsetMd = input<number>();

    /** Defines the offset width of the element on the layout grid for large screen devices. */
    readonly colOffsetLg = input<number>();

    /** Defines the offset width of the element on the layout grid for extra-large screen devices. */
    readonly colOffsetXl = input<number>();

    /**
     * @hidden
     * Access to the host element's ElementRef.
     */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly _cssClass = computed(() => {
        const classes: string[] = [
            CSS_CLASS_NAME.col,
            this.colGrow() ? CSS_CLASS_NAME.colGrow : '',
            this._getCssClassWithColWidth(CSS_CLASS_NAME.colSizePrefix, this.fdLayoutGridCol()),
            this._getCssClassWithColWidth(CSS_CLASS_NAME.mdColSizePrefix, this.colMd()),
            this._getCssClassWithColWidth(CSS_CLASS_NAME.lgColSizePrefix, this.colLg()),
            this._getCssClassWithColWidth(CSS_CLASS_NAME.xlColSizePrefix, this.colXl()),
            this._getCssClassWithColWidth(CSS_CLASS_NAME.colOffsetPrefix, this.colOffset()),
            this._getCssClassWithColWidth(CSS_CLASS_NAME.mdColOffsetPrefix, this.colOffsetMd()),
            this._getCssClassWithColWidth(CSS_CLASS_NAME.lgColOffsetPrefix, this.colOffsetLg()),
            this._getCssClassWithColWidth(CSS_CLASS_NAME.xlColOffsetPrefix, this.colOffsetXl())
        ].filter((v): v is string => !!v);

        return classes.join(' ');
    });

    /** @hidden */
    private _getCssClassWithColWidth(classPrefix: string, colWidth: NumberInput): string | null {
        if (!colWidth) {
            return null;
        }

        const col = coerceNumberProperty(colWidth);

        return col <= GRID_COLUMNS_NUMBER && col >= 1 ? classPrefix + col : null;
    }
}
