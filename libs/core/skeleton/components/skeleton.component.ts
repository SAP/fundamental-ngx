import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { range } from '@fundamental-ngx/cdk/utils';

/**
 * Type of skeleton visualization.
 * - `'rectangle'` - Rectangular skeleton with rounded corners
 * - `'circle'` - Circular skeleton
 * - `'text'` - Multi-line text skeleton
 * - `null` - No predefined shape, allows custom SVG projection
 */
export type SkeletonType = 'rectangle' | 'circle' | 'text' | null;

let skeletonUniqueId = 0;

/**
 * Skeleton component for displaying loading placeholders with animated pulse effect.
 */
@Component({
    selector: 'fd-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrl: './skeleton.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-skeleton',
        '[class.fd-skeleton--animated]': 'animated()',
        '[style.width]': 'computedWidth()',
        '[style.height]': 'computedHeight()'
    },
    imports: []
})
export class SkeletonComponent {
    /**
     * Whether the skeleton displays animated pulse effect.
     *
     * @type {boolean}
     * @default true
     */
    readonly animated = input(true);

    /**
     * Type of the skeleton visualization.
     *
     * Available types:
     * - `'rectangle'` - Rectangular skeleton with rounded corners
     * - `'circle'` - Circular skeleton
     * - `'text'` - Multi-line text skeleton
     * - `null` - No predefined shape, allows custom SVG projection
     *
     * @default null
     */
    readonly type = input<SkeletonType>(null);

    /**
     * Number of lines when type is `'text'`. Last line is 60% width if more than 1 line.
     *
     * Accepts numbers or coercible number values (e.g., `'3'` will be coerced to `3`).
     *
     * @type {number}
     * @default 3
     */
    readonly textLines = input<number, NumberInput>(3, {
        transform: coerceNumberProperty
    });

    /**
     * Width of skeleton.
     *
     * Accepts any valid CSS width value (e.g., `'100px'`, `'50%'`, `'10rem'`).
     * Auto-calculated for text and circle types if not provided.
     *
     * @type {string | null}
     * @default null
     */
    readonly width = input<string | null>(null);

    /**
     * Height of skeleton.
     *
     * Accepts any valid CSS height value (e.g., `'100px'`, `'50%'`, `'10rem'`).
     * Auto-calculated for text and circle types if not provided.
     *
     * @type {string | null}
     * @default null
     */
    readonly height = input<string | null>(null);

    /**
     * Vertical spacing between text lines in pixels.
     * Used for positioning lines in SVG and calculating total height.
     * @hidden
     */
    protected readonly LINE_SPACING = 20;

    /**
     * Computed dimensions (width and height) based on skeleton type.
     * @hidden
     */
    protected readonly dimensions = computed(() => {
        const currentType = this.type();
        const currentWidth = this.width();
        const currentHeight = this.height();

        if (currentType === 'text') {
            const lines = Math.max(1, this.textLines());
            return {
                width: currentWidth ?? '100%',
                height: currentHeight ?? (lines > 1 ? `${this.LINE_SPACING * lines}px` : '8px')
            };
        }

        if (currentType === 'circle') {
            // Make circle square by mirroring the provided dimension
            if (!currentWidth && currentHeight) {
                return { width: currentHeight, height: currentHeight };
            }
            if (!currentHeight && currentWidth) {
                return { width: currentWidth, height: currentWidth };
            }
        }

        // Default: pass through provided values
        return {
            width: currentWidth,
            height: currentHeight
        };
    });

    /**
     * Computed width value from dimensions.
     * @hidden
     */
    protected readonly computedWidth = computed(() => this.dimensions().width);

    /**
     * Computed height value from dimensions.
     * @hidden
     */
    protected readonly computedHeight = computed(() => this.dimensions().height);

    /**
     * Unique ID for SVG mask element.
     * @hidden
     */
    protected readonly svgMaskId = `fd-skeleton-${skeletonUniqueId++}`;

    /**
     * Computed array of line widths for text type.
     * Last line is 60% width when there are multiple lines.
     * @hidden
     */
    protected readonly textLineWidths = computed(() => {
        const totalLines = this.textLines();
        return range(totalLines, (i) => {
            const isLastLine = i + 1 === totalLines;
            const hasMultipleLines = i > 0;
            return isLastLine && hasMultipleLines ? '60%' : '100%';
        });
    });
}
