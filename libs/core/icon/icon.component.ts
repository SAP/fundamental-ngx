import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewEncapsulation,
    computed,
    inject,
    input,
    model,
    signal
} from '@angular/core';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
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
    host: {
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-hidden]': 'ariaHidden()',
        '[class.fd-list__navigation-item-icon]': '_navigationItemIcon()',
        '[class]': '_cssClasses()'
    }
})
export class IconComponent implements HasElementRef {
    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    readonly glyph = input<any>();

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    readonly font = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Icon color */
    readonly color = input<IconColor | null>(null);

    /** Icon color */
    readonly background = input<IconColor | null>(null);

    /** user's custom classes */
    readonly class = input<string>();

    /** Aria-label for Icon. */
    readonly ariaLabel = input<Nullable<string>>();

    /** Aria-hidden attribute for Icon element. */
    readonly ariaHidden = model<Nullable<boolean>>();

    /** @hidden */
    readonly elementRef = inject(ElementRef<HTMLElement>);

    /** Whether or not this icon is for a list navigation item. */
    readonly _navigationItemIcon = signal(false);

    /** @hidden Computed CSS classes */
    protected readonly _cssClasses = computed<string>(() => {
        const returnClass = [this.class()];

        if (!this.glyph()) {
            return this.class() || '';
        }

        returnClass.push(this._fontIconClass());

        return returnClass.join(' ');
    });

    /** @hidden */
    private readonly _fontIconClass = computed<string>(() =>
        fdBuildIconClass(this.font(), this.glyph(), this.color(), this.background())
    );
}
