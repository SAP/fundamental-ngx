import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, contentChildren, input } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
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
        '[class]': '_cssClass()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, LayoutGridRowDirective]
})
export class LayoutGridComponent {
    /** Custom classes */
    readonly class = input<string>('');

    /** Whether the grid should have a gap. */
    readonly noGap = input(false);

    /** Whether the grid should have a horizontal gap. */
    readonly noHorizontalGap = input(false);

    /** Whether the grid should have a vertical gap. */
    readonly noVerticalGap = input(false);

    /** @hidden */
    readonly _rowsQueryList = contentChildren(LayoutGridRowDirective);

    /** @hidden */
    protected readonly _cssClass = computed(() => {
        const classes: string[] = [CSS_CLASS_NAME.layoutGrid];

        if (this.noVerticalGap()) {
            classes.push(CSS_CLASS_NAME.layoutGridNoVerticalGap);
        }

        if (this.noHorizontalGap()) {
            classes.push(CSS_CLASS_NAME.layoutGridNoHorizontalGap);
        }

        if (this.noGap()) {
            classes.push(CSS_CLASS_NAME.layoutGridNoGap);
        }

        const customClass = this.class();
        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });
}
