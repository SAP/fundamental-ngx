import { booleanAttribute, Directive, forwardRef, Input, isDevMode, signal, Signal } from '@angular/core';
import { ContentDensityGlobalKeyword, LocalContentDensityMode } from '../content-density.types';
import { isContentDensityMode } from '../helpers/density-type-checkers';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Directive to control the content density of the elements.
 * This Directive is used in density controllers and consumers.
 *
 * Provides signal-based state management for reactive content density tracking.
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
    /** Current content density mode as a signal */
    readonly densityMode: Signal<LocalContentDensityMode>;

    private readonly _densityMode = signal<LocalContentDensityMode>(ContentDensityGlobalKeyword);

    /**
     * Update the content density of the element on the fly
     */
    @Input()
    // `${ContentDensityMode}` is here to allow the user to pass a string literal
    set fdContentDensity(val: `${ContentDensityMode}` | LocalContentDensityMode | '') {
        if (!isContentDensityMode(val)) {
            if (isDevMode() && val !== '') {
                console.warn(
                    `The value "${val}" is not a valid content density mode.
                     Using "${ContentDensityGlobalKeyword}" instead.`
                );
            }
            val = ContentDensityGlobalKeyword;
        }
        this._densityMode.set(val as LocalContentDensityMode);
    }

    /**
     * This input is basically syntax sugar, for not writing fdContentDensity="compact",
     * instead you can just write fdCompact="true" or [fdCompact]
     */
    @Input({ transform: booleanAttribute })
    set fdCompact(val: boolean) {
        this._densityMode.set(val ? ContentDensityMode.COMPACT : ContentDensityGlobalKeyword);
    }

    /**
     * This input is basically syntax sugar, for not writing fdContentDensity="condensed",
     * instead you can just write fdCondensed="true" or [fdCondensed]
     */
    @Input({ transform: booleanAttribute })
    set fdCondensed(val: boolean) {
        this._densityMode.set(val ? ContentDensityMode.CONDENSED : ContentDensityGlobalKeyword);
    }

    /**
     * This input is basically syntax sugar, for not writing fdContentDensity="cozy",
     * instead you can just write fdCozy="true" or [fdCozy]
     */
    @Input({ transform: booleanAttribute })
    set fdCozy(val: boolean) {
        this._densityMode.set(val ? ContentDensityMode.COZY : ContentDensityGlobalKeyword);
    }

    /**
     * Current density mode value
     * @deprecated Use densityMode() signal instead
     */
    get value(): LocalContentDensityMode {
        return this._densityMode();
    }

    constructor() {
        this.densityMode = this._densityMode.asReadonly();
    }
}
