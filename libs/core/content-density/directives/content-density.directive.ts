import { Directive, Input, OnDestroy, booleanAttribute, forwardRef, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentDensityGlobalKeyword, LocalContentDensityMode } from '../content-density.types';
import { isContentDensityMode } from '../helpers/density-type-checkers';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Directive to control the content density of the elements.
 * This Directive is used in density controllers and consumers
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
    ],
    standalone: true
})
export class ContentDensityDirective extends BehaviorSubject<LocalContentDensityMode> implements OnDestroy {
    /**
     * Update the content density of the element on the fly
     */
    @Input()
    // `${ContentDensityMode}` is here to allow the user to pass a string literal
    set fdContentDensity(val: `${ContentDensityMode}` | LocalContentDensityMode | '') {
        if (!isContentDensityMode(val)) {
            if (isDevMode() && val !== '') {
                console.log(
                    `The value "${val}" is not a valid content density mode.
                     Using "${ContentDensityGlobalKeyword}" instead.`
                );
            }
            val = ContentDensityGlobalKeyword;
        }
        this.next(val as LocalContentDensityMode);
    }

    /**
     * This input is basically syntax sugar, for not writing fdContentDensity="compact",
     * instead you can just write fdCompact="true" or [fdCompact]
     */
    @Input({ transform: booleanAttribute })
    set fdCompact(val: boolean) {
        this.next(val ? ContentDensityMode.COMPACT : ContentDensityGlobalKeyword);
    }

    /**
     * This input is basically syntax sugar, for not writing fdContentDensity="condensed",
     * instead you can just write fdCondensed="true" or [fdCondensed]
     */
    @Input({ transform: booleanAttribute })
    set fdCondensed(val: boolean) {
        this.next(val ? ContentDensityMode.CONDENSED : ContentDensityGlobalKeyword);
    }

    /**
     * This input is basically syntax sugar, for not writing fdContentDensity="cozy",
     * instead you can just write fdCozy="true" or [fdCozy]
     */
    @Input({ transform: booleanAttribute })
    set fdCozy(val: boolean) {
        this.next(val ? ContentDensityMode.COZY : ContentDensityGlobalKeyword);
    }

    /** @hidden */
    constructor() {
        super(ContentDensityGlobalKeyword);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.complete();
    }
}
