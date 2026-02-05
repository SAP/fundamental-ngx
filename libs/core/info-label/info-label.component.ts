import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

/** Display type for the info label. */
export type LabelType = 'numeric' | 'icon';

const labelColorRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const defaultColor: InfoLabelColor = 7;

/** Valid accent color values for info labels (1-10). */
export type InfoLabelColor = (typeof labelColorRange)[number];

/** Accent color input accepting both number and string representations. */
export type InfoLabelColorInput = InfoLabelColor | `${InfoLabelColor}`;

@Component({
    selector: 'fd-info-label',
    templateUrl: './info-label.component.html',
    styleUrl: './info-label.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent, FdTranslatePipe],
    host: {
        '[class]': 'cssClass()'
    }
})
export class InfoLabelComponent implements HasElementRef {
    /**
     * The type of the info label.
     * - `'numeric'`: Displays the label as a number with special numeric styling
     * - `'icon'`: Displays an icon alongside the label text
     * - `undefined`: Default text-only label (omit this property for default)
     * @default undefined
     */
    readonly type = input<LabelType>();

    /**
     * The icon name to display when `type` is set to `'icon'`.
     * @default null
     */
    readonly glyph = input<string | null>();

    /**
     * The icon font family to use for the icon.
     * @default 'SAP-icons'
     */
    readonly font = input<IconFont>('SAP-icons');

    /**
     * Accent color of the info label, ranging from 1 to 10.
     * Invalid values default to 7 with a console warning in development mode.
     * @default 7
     */
    readonly color = input<InfoLabelColorInput | null | undefined>(defaultColor);

    /**
     * The text content displayed in the info label.
     */
    readonly label = input<string>();

    /**
     * Tooltip text displayed on hover.
     * Provides additional context about the label.
     */
    readonly title = input<string>();

    /**
     * ARIA label for accessibility.
     * Overrides the visible label for screen readers when provided.
     */
    readonly ariaLabel = input<string | null>();

    /**
     * ARIA labelledby for accessibility.
     * Used when the label is provided by another element.
     */
    readonly ariaLabelledBy = input<string | null>();

    /**
     * Screen reader only text for additional context.
     * Defaults to translated "Info Label" if not provided.
     */
    readonly srText = input<string>();

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden Validated color with fallback to default */
    protected readonly validatedColor = computed(() => {
        const numericColor = Number(this.color() ?? defaultColor);

        // Check if it's a valid integer in range 1-10
        if (Number.isInteger(numericColor) && numericColor >= 1 && numericColor <= 10) {
            return numericColor;
        }

        return defaultColor; // Default fallback for invalid values
    });

    /** @hidden */
    protected readonly cssClass = computed(() =>
        [
            'fd-info-label',
            this.type() ? `fd-info-label--${this.type()}` : '',
            `fd-info-label--accent-color-${this.validatedColor()}`
        ]
            .filter(Boolean)
            .join(' ')
    );
}
