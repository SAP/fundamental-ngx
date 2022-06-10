import { Directive, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentDensityMode } from '../content-density.types';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
    selector: '[fdContentDensity], [fdCompact], [fdCondensed], [fdCozy]'
})
export class ContentDensityDirective extends BehaviorSubject<ContentDensityMode> implements OnDestroy {
    @Input()
    set fdContentDensity(val: ContentDensityMode | '') {
        this.next(val ? val : ContentDensityMode.GLOBAL);
    }

    @Input()
    set fdCompact(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.COMPACT);
        } else {
            this.next(ContentDensityMode.GLOBAL);
        }
    }

    @Input()
    set fdCondensed(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.CONDENSED);
        } else {
            this.next(ContentDensityMode.GLOBAL);
        }
    }

    @Input()
    set fdCozy(val: BooleanInput) {
        if (coerceBooleanProperty(val)) {
            this.next(ContentDensityMode.COZY);
        } else {
            this.next(ContentDensityMode.GLOBAL);
        }
    }

    constructor() {
        super(ContentDensityMode.GLOBAL);
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
