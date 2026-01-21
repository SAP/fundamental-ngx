import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    contentChildren,
    inject,
    input
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { CSS_CLASS_NAME } from './constants';
import { LayoutGridRowDirective } from './directives/layout-grid-row.directive';

/**
 * Use a layout grid to arrange components evenly in a grid layout.
 */
@Component({
    selector: 'fd-layout-grid, [fdLayoutGrid]',
    templateUrl: './layout-grid.component.html',
    styleUrl: './layout-grid.component.scss',
    host: {
        class: CSS_CLASS_NAME.layoutGrid,
        '[class.fd-container--no-gap]': 'noGap()',
        '[class.fd-container--no-horizontal-gap]': 'noHorizontalGap()',
        '[class.fd-container--no-vertical-gap]': 'noVerticalGap()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, LayoutGridRowDirective]
})
export class LayoutGridComponent implements HasElementRef {
    /** Whether the grid should have a gap. */
    readonly noGap = input(false);

    /** Whether the grid should have a horizontal gap. */
    readonly noHorizontalGap = input(false);

    /** Whether the grid should have a vertical gap. */
    readonly noVerticalGap = input(false);

    /** @hidden */
    readonly _rowsQueryList = contentChildren(LayoutGridRowDirective);

    /**
     * @hidden
     * Access to the host element's ElementRef.
     */
    public readonly elementRef = inject(ElementRef);
}
