import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';

/**
 * @hidden
 * The base class for the icon component
 */
const BASE_ICON_CLASS = 'sap-icon';

/**
 * @hidden
 * Prefix for icon prop classes
 */
const PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';

/**
 * The component that represents an icon.
 *
 * ```html
 * <fd-icon [glyph]="cart-approval"></fd-icon>
 * ```
 */
@Component({
    selector: 'fd-icon',
    template: ``,
    styleUrls: ['./icon.component.scss'],
    host: {
        role: 'presentation'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnChanges, OnInit, CssClassBuilder {

    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input() glyph;

    /** user's custom classes */
    @Input()
    class: string;

    /** @deprecated
     * Icon size is deprecated. The size can be set by font-size. It will be removed after version 0.23
     * The size of the icon
     * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
     * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
     */
    @Input() size = '';

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

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            this.class,
            this.glyph ? (PREFIX_ICON_CLASS + this.glyph) : ''
        ];
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
