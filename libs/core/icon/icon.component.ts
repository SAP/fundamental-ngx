import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    ViewEncapsulation,
    computed,
    effect,
    signal
} from '@angular/core';
import { CssClassBuilder, Nullable, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { FD_ICON_COMPONENT } from './tokens';

export type IconFont = 'SAP-icons' | 'BusinessSuiteInAppSymbols' | 'SAP-icons-TNT';

export const FD_DEFAULT_ICON_FONT_FAMILY = 'SAP-icons';

export type IconColor =
    | 'default'
    | 'contrast'
    | 'non-interactive'
    | 'tile'
    | 'marker'
    | 'critical'
    | 'negative'
    | 'neutral'
    | 'positive'
    | 'information';

const SAP_ICONS_PREFIX = 'sap-icon';

export const FD_ICON_FONT_FAMILY: Record<IconFont, string> = {
    'SAP-icons': SAP_ICONS_PREFIX,
    BusinessSuiteInAppSymbols: `${SAP_ICONS_PREFIX}-businessSuiteInAppSymbols`,
    'SAP-icons-TNT': `${SAP_ICONS_PREFIX}-TNT`
};

/**
 * Helper function to build icon css class.
 * @param font Font family
 * @param glyph Icon
 * @param color Icon color
 * @param background Icon background color
 * @returns Computed css class string.
 */
export function fdBuildIconClass(
    font: IconFont,
    glyph: any,
    color?: IconColor | null,
    background?: IconColor | null
): string {
    const fontFamily = FD_ICON_FONT_FAMILY[font];

    const returnIconClass = [`${fontFamily}--${glyph}`];

    if (color) {
        returnIconClass.push(`${fontFamily}--color-${color}`);
    }

    if (background) {
        returnIconClass.push(`${fontFamily}--background-${background}`);
    }

    return returnIconClass.join(' ');
}

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
    styleUrl: './icon.component.scss',
    providers: [
        {
            provide: FD_ICON_COMPONENT,
            useExisting: IconComponent
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class IconComponent implements CssClassBuilder {
    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input()
    set glyph(value: any) {
        this._glyph.set(value);
    }
    get glyph(): any {
        return this._glyph();
    }

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    @Input()
    set font(value: IconFont) {
        this._font.set(value);
    }

    get font(): IconFont {
        return this._font();
    }

    /** Icon color */
    @Input()
    set color(value: IconColor | null) {
        this._color.set(value);
    }

    get color(): IconColor | null {
        return this._color();
    }

    /** Icon color */
    @Input()
    set background(value: IconColor | null) {
        this._background.set(value);
    }

    get background(): IconColor | null {
        return this._background();
    }

    /** user's custom classes */
    @Input()
    class: string;

    /** Aria-label for Icon. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: Nullable<string>;

    /** Aria-hidden attribute for Icon element. */
    @Input()
    @HostBinding('attr.aria-hidden')
    ariaHidden: Nullable<boolean>;

    /** Whether or not this icon is for a list navigation item. */
    @HostBinding('class.fd-list__navigation-item-icon')
    _navigationItemIcon = false;

    /** @hidden */
    private readonly _glyph = signal<any>('');
    /** @hidden */
    private readonly _font = signal<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** @hidden */
    private readonly _color = signal<IconColor | null>(null);

    /** @hidden */
    private readonly _background = signal<IconColor | null>(null);

    /** @hidden */
    private readonly _fontIconClass = computed(() =>
        fdBuildIconClass(this._font(), this._glyph(), this._color(), this._background())
    );

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {
        effect(() => {
            this.buildComponentCssClass();
        });
    }

    /**
     * @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        const returnClass = [this.class];

        if (!this._glyph()) {
            return returnClass;
        }

        returnClass.push(this._fontIconClass());

        return returnClass;
    }
}
