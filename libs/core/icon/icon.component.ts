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
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
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

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

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
    background?: IconColor | null,
    size?: IconSize | null
): string {
    const fontFamily = FD_ICON_FONT_FAMILY[font];

    const returnIconClass = [fontFamily, `${fontFamily}--${glyph}`];

    if (color) {
        returnIconClass.push(`${fontFamily}--color-${color}`);
    }

    if (background) {
        returnIconClass.push(`${fontFamily}--background-${background}`);
    }

    if (size) {
        returnIconClass.push(`${fontFamily}--${size}`);
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
        '[attr.role]': 'computedRole()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-hidden]': 'effectiveAriaHidden()',
        '[class.fd-list__navigation-item-icon]': '_navigationItemIcon()',
        '[class]': 'cssClasses()'
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

    /** Icon size */
    readonly size = input<IconSize | null>(null);

    /** user's custom classes */
    readonly class = input<string>();

    /** Aria-label for Icon. */
    readonly ariaLabel = input<string | null>();

    /** Aria-hidden attribute for Icon element. */
    readonly ariaHidden = model<boolean | null>();

    /** @hidden */
    readonly elementRef = inject(ElementRef<HTMLElement>);

    /** Whether or not this icon is for a list navigation item. */
    readonly _navigationItemIcon = signal(false);

    /** @hidden Computed role — "presentation" for decorative, "img" when ariaLabel is set. */
    protected readonly computedRole = computed(() => (this.ariaLabel() ? 'img' : 'presentation'));

    /** @hidden Default aria-hidden to true for decorative icons (no ariaLabel). */
    protected readonly effectiveAriaHidden = computed<boolean | null>(() => {
        const explicit = this.ariaHidden();
        if (explicit != null) {
            return explicit;
        }
        return !this.ariaLabel() ? true : null;
    });

    /** @hidden Computed CSS classes */
    protected readonly cssClasses = computed<string>(() => {
        const returnClass = [this.class()];

        if (!this.glyph()) {
            return this.class() || '';
        }

        returnClass.push(this._fontIconClass());

        return returnClass.join(' ');
    });

    /** @hidden */
    private readonly _fontIconClass = computed<string>(() =>
        fdBuildIconClass(this.font(), this.glyph(), this.color(), this.background(), this.size())
    );
}
