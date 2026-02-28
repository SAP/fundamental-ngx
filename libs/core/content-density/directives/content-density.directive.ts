import {
    booleanAttribute,
    computed,
    Directive,
    effect,
    ElementRef,
    forwardRef,
    inject,
    input,
    isDevMode,
    Renderer2,
    signal
} from '@angular/core';
import { ContentDensityGlobalKeyword, LocalContentDensityMode } from '../content-density.types';
import { isContentDensityMode } from '../helpers/density-type-checkers';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { ContentDensityMode } from '../types/content-density.mode';

/** UI5 attribute name for compact mode */
const UI5_COMPACT_ATTRIBUTE = 'data-ui5-compact-size';

/**
 * Directive to control the content density of elements.
 * Used by density controllers and consumers.
 *
 * Provides signal-based state management for reactive content density tracking.
 * Also applies UI5 `data-ui5-compact-size` attribute for UI5 Web Components compatibility.
 *
 * @example
 * // Using fdContentDensity input
 * <fd-button [fdContentDensity]="'compact'">Button</fd-button>
 *
 * // Using shorthand inputs
 * <fd-button fdCompact>Compact Button</fd-button>
 * <fd-button fdCozy>Cozy Button</fd-button>
 * <fd-button fdCondensed>Condensed Button</fd-button>
 */
@Directive({
    selector: `[fdContentDensity]:not([fdCompact]):not([fdCondensed]):not([fdCozy]),
                [fdCompact]:not([fdContentDensity]):not([fdCondensed]):not([fdCozy]),
                [fdCondensed]:not([fdContentDensity]):not([fdCompact]):not([fdCozy]),
                [fdCozy]:not([fdContentDensity]):not([fdCompact]):not([fdCondensed])`,
    exportAs: 'fdContentDensity',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => ContentDensityDirective)
        }
    ]
})
export class ContentDensityDirective {
    /**
     * Sets the content density of the element dynamically.
     * Accepts 'compact', 'cozy', 'condensed', or 'global'.
     *
     * @example
     * <fd-button [fdContentDensity]="'compact'">Button</fd-button>
     */
    readonly fdContentDensity = input<`${ContentDensityMode}` | LocalContentDensityMode | ''>('');

    /**
     * Shorthand for setting compact density.
     * Equivalent to `[fdContentDensity]="'compact'"`.
     *
     * @example
     * <fd-button fdCompact>Button</fd-button>
     * <fd-button [fdCompact]="isCompact">Button</fd-button>
     */
    readonly fdCompact = input(false, { transform: booleanAttribute });

    /**
     * Shorthand for setting condensed density.
     * Equivalent to `[fdContentDensity]="'condensed'"`.
     *
     * @example
     * <fd-button fdCondensed>Button</fd-button>
     * <fd-button [fdCondensed]="isCondensed">Button</fd-button>
     */
    readonly fdCondensed = input(false, { transform: booleanAttribute });

    /**
     * Shorthand for setting cozy density.
     * Equivalent to `[fdContentDensity]="'cozy'"`.
     *
     * @example
     * <fd-button fdCozy>Button</fd-button>
     * <fd-button [fdCozy]="isCozy">Button</fd-button>
     */
    readonly fdCozy = input(false, { transform: booleanAttribute });

    /**
     * Current content density mode as a computed signal.
     * Resolves the density based on shorthand inputs or fdContentDensity value.
     *
     * @returns The resolved content density mode
     */
    readonly densityMode: ReturnType<typeof computed<LocalContentDensityMode>> = computed(() => {
        // Check programmatic override first
        const programmaticDensity = this._programmaticDensity();
        if (programmaticDensity !== null) {
            return programmaticDensity;
        }

        // Check shorthand inputs
        if (this.fdCompact()) {
            return ContentDensityMode.COMPACT;
        }
        if (this.fdCondensed()) {
            return ContentDensityMode.CONDENSED;
        }
        if (this.fdCozy()) {
            return ContentDensityMode.COZY;
        }

        // Then check fdContentDensity input
        const val = this.fdContentDensity();
        if (val === '') {
            return ContentDensityGlobalKeyword;
        }
        if (!isContentDensityMode(val)) {
            if (isDevMode()) {
                console.warn(
                    `The value "${val}" is not a valid content density mode. Using "${ContentDensityGlobalKeyword}" instead.`
                );
            }
            return ContentDensityGlobalKeyword;
        }
        return val as LocalContentDensityMode;
    });

    /**
     * Current density mode value.
     *
     * @deprecated Use densityMode() signal instead
     * @returns The current content density mode
     */
    get value(): LocalContentDensityMode {
        return this.densityMode();
    }

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);
    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /**
     * Internal signal for programmatic density updates.
     * Takes precedence over input bindings when set.
     */
    private readonly _programmaticDensity = signal<LocalContentDensityMode | null>(null);

    /** @hidden */
    constructor() {
        // Effect to apply UI5 attribute based on density mode
        effect(() => {
            this._applyUi5Attribute(this.densityMode());
        });
    }

    /**
     * Sets the content density programmatically.
     * Use this method when you need to update the density from code
     * (e.g., in host directives or dynamic scenarios).
     *
     * @param density The content density mode to set
     */
    setDensity(density: LocalContentDensityMode): void {
        this._programmaticDensity.set(density);
    }

    /**
     * Clears the programmatic density override.
     * After calling this, the density will be resolved from input bindings.
     */
    clearDensity(): void {
        this._programmaticDensity.set(null);
    }

    /**
     * Applies or removes the UI5 compact attribute based on density mode.
     * COMPACT and CONDENSED map to UI5 compact mode.
     * COZY and 'global' do not apply the attribute (UI5 defaults to cozy).
     * @hidden
     */
    private _applyUi5Attribute(density: LocalContentDensityMode): void {
        const nativeElement = this._elementRef?.nativeElement;
        // Only apply to actual HTML elements, not comment/text nodes
        if (!nativeElement || !this._renderer || !(nativeElement instanceof HTMLElement)) {
            return;
        }

        const isUi5Compact = density === ContentDensityMode.COMPACT || density === ContentDensityMode.CONDENSED;

        if (isUi5Compact) {
            this._renderer.setAttribute(nativeElement, UI5_COMPACT_ATTRIBUTE, '');
        } else {
            this._renderer.removeAttribute(nativeElement, UI5_COMPACT_ATTRIBUTE);
        }
    }
}
