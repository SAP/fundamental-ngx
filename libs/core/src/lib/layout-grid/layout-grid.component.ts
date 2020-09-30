import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';

/**
 * Use a layout grid to arrange components evenly in a grid layout.
 */
@Component({
    selector: 'fd-layout-grid, [fdLayoutGrid]',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./layout-grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutGridComponent implements CssClassBuilder {

    /** Custom classes */
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** Whether the grid should have a gap. */
    @Input()
    noGap: boolean;

    /** @hidden */
    private _class = '';

    /** @hidden */
    constructor(private _elementRef: ElementRef) { }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-container',
            this.noGap ? 'fd-container--no-gap' : '',
            this._class
        ];
    }
}
