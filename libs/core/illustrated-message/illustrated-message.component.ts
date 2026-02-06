import {
    afterNextRender,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    input,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { HasElementRef, RequireOnlyOne } from '@fundamental-ngx/cdk/utils';
import { debounceTime, fromEvent } from 'rxjs';

/**
 * Configuration for an SVG item in the illustrated message.
 */
export interface SvgItemConfig {
    /** URL to the SVG sprite file */
    url: string;
    /** ID of the symbol within the SVG sprite */
    id: string;
    /** Inline SVG file content */
    file: string;
}

/**
 * Configuration for different SVG sizes in the illustrated message.
 * Supports both modern (large, medium, small, xsmall) and legacy (scene, dialog, spot, dot) naming.
 */
export interface SvgConfig {
    /** Configuration for large/scene size (>= 682px) */
    large?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    /** Configuration for medium/dialog size (361px - 681px) */
    medium?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    /** Configuration for small/spot size (261px - 360px) */
    small?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    /** Configuration for extra small/dot size (161px - 260px) */
    xsmall?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;

    /** @deprecated Use 'large' instead */
    scene?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    /** @deprecated Use 'medium' instead */
    dialog?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    /** @deprecated Use 'small' instead */
    spot?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    /** @deprecated Use 'xsmall' instead */
    dot?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
}

/**
 * Type of illustrated message based on container width or explicit configuration.
 * Modern types: large, medium, small, xsmall, base
 * Legacy types: scene, dialog, spot, dot
 */
export type IllustratedMessageType =
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'base'
    | 'scene'
    | 'dialog'
    | 'spot'
    | 'dot';

/**
 * Enumeration of illustrated message types with their string values.
 */
export enum IllustratedMessageTypes {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small',
    EXTRA_SMALL = 'xsmall',
    BASE = 'base',
    /** @deprecated Use LARGE instead */
    SCENE = 'scene',
    /** @deprecated Use MEDIUM instead */
    DIALOG = 'dialog',
    /** @deprecated Use SMALL instead */
    SPOT = 'spot',
    /** @deprecated Use EXTRA_SMALL instead */
    DOT = 'dot'
}

let illustratedMessageUniqueId = 0;

/**
 * Component representing an illustrated message with responsive SVG illustration.
 *
 * The component automatically adjusts its illustration size based on container width:
 * - Large (>= 682px)
 * - Medium (361px - 681px)
 * - Small (261px - 360px)
 * - Extra Small (161px - 260px)
 * - Base (< 161px)
 *
 * Supports both URL-based SVG sprites and inline SVG content.
 *
 * @example
 * ```html
 * <div fd-illustrated-message [svgConfig]="svgConfig">
 *   <figcaption fd-illustrated-message-figcaption>
 *     <h3>No Data Available</h3>
 *     <p>Please check back later</p>
 *   </figcaption>
 * </div>
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-illustrated-message]',
    templateUrl: './illustrated-message.component.html',
    styleUrl: './illustrated-message.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    host: {
        '[attr.id]': 'id()',
        '[class]': 'cssClass()'
    }
})
export class IllustratedMessageComponent implements HasElementRef {
    /**
     * Explicitly set the illustration type. If not provided, type is determined by container width.
     */
    readonly type = input<IllustratedMessageType>();

    /**
     * Configuration for SVG illustrations at different sizes.
     */
    readonly svgConfig = input<SvgConfig>();

    /**
     * Accessible label for the SVG illustration.
     */
    readonly svgAriaLabel = input<string | null | undefined>(null);

    /**
     * When true, hides the SVG illustration entirely.
     */
    readonly noSvg = input(false, { transform: booleanAttribute });

    /**
     * Unique identifier for the illustrated message component.
     */
    readonly id = input<string>(`fd-illustrated-message-${++illustratedMessageUniqueId}`);

    /**
     * Reference to the host element.
     */
    readonly elementRef = inject(ElementRef);

    /**
     * Signal tracking container width for responsive behavior.
     * @hidden
     */
    protected readonly containerWidth = signal<number>(0);

    /**
     * Normalized illustration type from explicit input or legacy names.
     * @hidden
     */
    protected readonly normalizedInputType = computed(() => {
        const explicitType = this.type();
        return explicitType ? this._normalizeType(explicitType) : undefined;
    });

    /**
     * Current illustration type based on explicit type or container width.
     * @hidden
     */
    protected readonly currentType = computed(
        () => this.normalizedInputType() || this._determineTypeByWidth(this.containerWidth())
    );

    /**
     * Normalized SVG configuration with legacy keys mapped to modern keys.
     * @hidden
     */
    protected readonly normalizedConfig = computed(() => {
        const config = this.svgConfig();
        return config ? this._normalizeSvgConfig(config) : null;
    });

    /**
     * Inline SVG content for the current type.
     * @hidden
     */
    protected readonly inlineSvg = computed(() => {
        const config = this.normalizedConfig();
        const type = this.currentType();
        const inlineSvg = config?.[type]?.file;
        return inlineSvg ? this._sanitizer.bypassSecurityTrustHtml(inlineSvg) : undefined;
    });

    /**
     * SVG href attribute for the current type.
     * @hidden
     */
    protected readonly href = computed(() => {
        const config = this.normalizedConfig();
        if (!config) {
            return '';
        }
        return this._getHrefByType(this.currentType(), config);
    });

    /**
     * Computed CSS class string for the component.
     * @hidden
     */
    protected readonly cssClass = computed(() => {
        const classes: string[] = ['fd-illustrated-message'];

        const currentTypeValue = this.currentType();
        if (currentTypeValue && currentTypeValue !== 'base') {
            classes.push(`fd-illustrated-message--${currentTypeValue}`);
        }

        return classes.join(' ');
    });

    /** @hidden */
    private readonly _sanitizer = inject(DomSanitizer);

    /** @hidden */
    constructor() {
        // Setup resize listener for responsive behavior with automatic cleanup
        const resize$ = toSignal(fromEvent(window, 'resize').pipe(debounceTime(200)));

        // Measure container width after render
        afterNextRender(() => {
            this._measureContainerWidth();
        });

        // React to resize events and input changes
        effect(() => {
            // Track resize events
            resize$();
            this.type();
            this.svgConfig();

            // Remeasure on changes
            this._measureContainerWidth();
        });
    }

    /**
     * Measures and updates the container width.
     * @private
     */
    private _measureContainerWidth(): void {
        const width = this.elementRef.nativeElement.offsetWidth;

        if (this.containerWidth() !== width) {
            this.containerWidth.set(width);
        }
    }

    /**
     * Determines the illustration type based on container width.
     * @param width - Container width in pixels
     * @returns Appropriate illustration type
     * @private
     */
    private _determineTypeByWidth(width: number): IllustratedMessageType {
        if (width >= 682) {
            return IllustratedMessageTypes.LARGE;
        } else if (width >= 361) {
            return IllustratedMessageTypes.MEDIUM;
        } else if (width >= 261) {
            return IllustratedMessageTypes.SMALL;
        } else if (width >= 161) {
            return IllustratedMessageTypes.EXTRA_SMALL;
        }

        return IllustratedMessageTypes.BASE;
    }

    /**
     * Normalizes legacy type names to modern equivalents.
     * @param type - Illustration type to normalize
     * @returns Normalized illustration type
     * @private
     */
    private _normalizeType(type: IllustratedMessageType): IllustratedMessageType {
        switch (type) {
            case 'scene':
                return 'large';
            case 'dialog':
                return 'medium';
            case 'spot':
                return 'small';
            case 'dot':
                return 'xsmall';
            default:
                return type;
        }
    }

    /**
     * Normalizes SVG configuration, mapping legacy keys to modern keys.
     * @param config - SVG configuration to normalize
     * @returns Normalized SVG configuration
     * @private
     */
    private _normalizeSvgConfig(config: SvgConfig): SvgConfig {
        return {
            large: config.large || config.scene,
            medium: config.medium || config.dialog,
            small: config.small || config.spot,
            xsmall: config.xsmall || config.dot
        };
    }

    /**
     * Constructs the SVG href attribute value for the given type.
     * @param type - Illustration type
     * @param svgConfig - Normalized SVG configuration
     * @returns SVG href string
     * @private
     */
    private _getHrefByType(type: IllustratedMessageType, svgConfig: SvgConfig): string {
        switch (type) {
            case 'large':
                return `${svgConfig.large?.url || ''}#${svgConfig.large?.id}`;
            case 'medium':
                return `${svgConfig.medium?.url || ''}#${svgConfig.medium?.id}`;
            case 'small':
                return `${svgConfig.small?.url || ''}#${svgConfig.small?.id}`;
            case 'xsmall':
                return `${svgConfig.xsmall?.url || ''}#${svgConfig.xsmall?.id}`;
            default:
                return '';
        }
    }
}
