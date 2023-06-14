import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';

import { CSS_CLASS_NAME } from './constants';
import { LayoutGridRowDirective } from './directives/layout-grid-row.directive';

/**
 * Use a layout grid to arrange components evenly in a grid layout.
 */
@Component({
    selector: 'fd-layout-grid, [fdLayoutGrid]',
    templateUrl: './layout-grid.component.html',
    styleUrls: ['./layout-grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutGridComponent implements OnInit, OnChanges, CssClassBuilder {
    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** Whether the grid should have a gap. */
    @Input()
    noGap: boolean;

    /** Whether the grid should have a horizontal gap. */
    @Input()
    noHorizontalGap: boolean;

    /** Whether the grid should have a vertical gap. */
    @Input()
    noVerticalGap: boolean;

    /** @hidden */
    @ContentChildren(LayoutGridRowDirective)
    _rowsQueryList: QueryList<LayoutGridRowDirective>;

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            CSS_CLASS_NAME.layoutGrid,
            this.noVerticalGap ? CSS_CLASS_NAME.layoutGridNoVerticalGap : '',
            this.noHorizontalGap ? CSS_CLASS_NAME.layoutGridNoHorizontalGap : '',
            this.noGap ? CSS_CLASS_NAME.layoutGridNoGap : '',
            this._class
        ];
    }
}
