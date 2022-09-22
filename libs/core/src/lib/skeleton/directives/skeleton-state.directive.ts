import { Directive, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { LocalSkeletonState, SkeletonStateGlobalKeyword } from '../skeleton.types';

/** Directive to set the skeleton state for the component subtree. Optionally renders the skeleton template, if passed. */
@Directive({
    selector: '[fdSkeletonState]'
})
export class SkeletonStateDirective extends BehaviorSubject<LocalSkeletonState> implements OnDestroy {
    /** Set the skeleton state for the component subtree. If set to 'global', then the global skeleton state will be used. */
    @Input()
    set fdSkeletonState(value: LocalSkeletonState) {
        this.next(value);
    }

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor() {
        super(SkeletonStateGlobalKeyword);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();

        this.complete();
    }
}
