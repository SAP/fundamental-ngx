import { Directive, forwardRef, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';
import { ContentDensityGlobalKeyword, ContentDensityMode, LocalContentDensityMode } from '../content-density.types';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';

@Directive({
    selector: '[fdContentDensity], [fdCompact], [fdCondensed], [fdCozy]',
    exportAs: 'fdContentDensity',
    providers: [
        {
            provide: CONTENT_DENSITY_DIRECTIVE,
            useExisting: forwardRef(() => ContentDensityDirective)
        }
    ]
})
export class ContentDensityDirective extends BehaviorSubject<LocalContentDensityMode> implements OnDestroy {
    @Input()
    set fdContentDensity(val: LocalContentDensityMode | '') {
        this.next(val ? val : ContentDensityGlobalKeyword);
    }

    @Input()
    set fdCompact(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.COMPACT);
        } else {
            this.next(ContentDensityGlobalKeyword);
        }
    }

    @Input()
    set fdCondensed(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.CONDENSED);
        } else {
            this.next(ContentDensityGlobalKeyword);
        }
    }

    @Input()
    set fdCozy(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.COZY);
        } else {
            this.next(ContentDensityGlobalKeyword);
        }
    }

    constructor() {
        super(ContentDensityGlobalKeyword);
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
