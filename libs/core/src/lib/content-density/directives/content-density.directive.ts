import { Directive, forwardRef, Input, isDevMode, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { WebDirective } from '@fundamental-ngx/core/web-components';
import { BehaviorSubject } from 'rxjs';
import { ContentDensityGlobalKeyword, ContentDensityMode, LocalContentDensityMode } from '../content-density.types';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { isContentDensityMode } from '../helpers/density-type-checkers';

/**
 * Directive to control the content density of the elements.
 * This Directive is used in density controllers and consumers
 */
@WebDirective({
    selector: `[fdwContentDensity]:not([fdwCompact]):not([fdwCondensed]):not([fdwCozy]),
                [fdwCompact]:not([fdwContentDensity]):not([fdwCondensed]):not([fdwCozy]),
                [fdwCondensed]:not([fdwContentDensity]):not([fdwCompact]):not([fdwCozy]),
                [fdwCozy]:not([fdwContentDensity]):not([fdwCompact]):not([fdwCondensed])`
})
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
export class ContentDensityDirective extends BehaviorSubject<LocalContentDensityMode> implements OnDestroy {
    /**
     * Update the content density of the element on the fly
     */
    @Input()
    set fdContentDensity(val: LocalContentDensityMode | '') {
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
    @Input()
    set fdCompact(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.COMPACT);
        } else {
            this.next(ContentDensityGlobalKeyword);
        }
    }

    @Input()
    set fdwCompact(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.COMPACT);
        } else {
            this.next(ContentDensityGlobalKeyword);
        }
    }

    /**
     * This input is basically syntax sugar, for not writing fdContentDensity="condensed",
     * instead you can just write fdCondensed="true" or [fdCondensed]
     */
    @Input()
    set fdCondensed(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.CONDENSED);
        } else {
            this.next(ContentDensityGlobalKeyword);
        }
    }

    /**
     * This input is basically syntax sugar, for not writing fdContentDensity="cozy",
     * instead you can just write fdCozy="true" or [fdCozy]
     */
    @Input()
    set fdCozy(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.COZY);
        } else {
            this.next(ContentDensityGlobalKeyword);
        }
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
