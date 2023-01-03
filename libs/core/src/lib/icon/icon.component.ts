import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';

export type IconFont = 'SAP-icons' | 'BusinessSuiteInAppSymbols' | 'SAP-icons-TNT';

const SAP_ICONS_PREFIX = 'sap-icon';
const TNT_PREFIX = 'TNT';
const BusinessSuiteInAppSymbol_PREFIX = 'businessSuiteInAppSymbols';

/**
 * The component that represents an icon.
 *
 * ```html
 * <fd-icon font="SAP-icons-TNT" glyph="exceptions"></fd-icon>
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

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    @Input() font: IconFont = 'SAP-icons';

    /** user's custom classes */
    @Input()
    class: string;

    /** Aria-label for Icon. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: Nullable<string>;

    /** Whether or not this icon is for a list navigation item. */
    @HostBinding('class.fd-list__navigation-item-icon')
    _navigationItemIcon = false;

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

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class,
            this.glyph && this.font === 'SAP-icons' ? `${SAP_ICONS_PREFIX}--${this.glyph}` : '',
            this.glyph && this.font === 'SAP-icons-TNT' ? `${SAP_ICONS_PREFIX}-${TNT_PREFIX}--${this.glyph}` : '',
            this.glyph && this.font === 'BusinessSuiteInAppSymbols'
                ? `${SAP_ICONS_PREFIX}-${BusinessSuiteInAppSymbol_PREFIX}--${this.glyph}`
                : ''
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
