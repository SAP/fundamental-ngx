import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';
import { CSS_CLASS_NAME } from './constants';

/**
 * Use a layout grid to arrange components evenly in a grid layout.
 */
@Component({
    selector: 'fd-layout-grid, [fdLayoutGrid]',
    template: `<ng-content></ng-content>`,
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
    private _class = '';

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
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
            CSS_CLASS_NAME.layoutGrid,
            this.noVerticalGap ? CSS_CLASS_NAME.layoutGridNoVerticalGap : '',
            this.noHorizontalGap ? CSS_CLASS_NAME.layoutGridNoHorizontalGap : '',
            this.noGap ? CSS_CLASS_NAME.layoutGridNoGap : '',
            this._class
        ];
    }
}
