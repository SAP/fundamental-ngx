import {
    Directive,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { getChangesSource$ } from '../helpers/get-changes-source';
import { SkeletonService } from '../services/skeleton.service';
import { LocalSkeletonState, SkeletonStateGlobalKeyword } from '../skeleton.types';
import { SKELETON_DIRECTIVE } from '../tokens/skeleton-directive.token';

/** Directive to set the skeleton state for the components subtree. Optionally renders skeleton template, if passed. */
@Directive({
    selector: '[fdSkeleton]',
    providers: [
        {
            provide: SKELETON_DIRECTIVE,
            useExisting: forwardRef(() => SkeletonDirective)
        }
    ]
})
export class SkeletonDirective extends BehaviorSubject<LocalSkeletonState> implements OnInit, OnDestroy {
    /** Set the skeleton state for the components subtree. If set to 'global' then global skeleton state will be used. */
    @Input()
    set fdSkeleton(value: LocalSkeletonState) {
        this.next(value);
    }

    /** Skeleton Template to render instead. */
    @Input()
    fdSkeletonTemplate: TemplateRef<any>;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(
        @Optional() private readonly _skeletonService: SkeletonService,
        private readonly _vcr: ViewContainerRef,
        private readonly _templateRef: TemplateRef<any>
    ) {
        super(SkeletonStateGlobalKeyword);
    }

    /** @hidden */
    ngOnInit(): void {
        getChangesSource$(this, this._skeletonService)
            .pipe(distinctUntilChanged(), takeUntil(this._onDestroy$))
            .subscribe((loadingState) => this._updateView(loadingState));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();

        this.complete();
    }

    /** @hidden */
    _updateView(loadingState: boolean): void {
        this._vcr.clear();

        if (loadingState && this.fdSkeletonTemplate) {
            this._vcr.createEmbeddedView(this.fdSkeletonTemplate);
        } else if (this._templateRef) {
            this._vcr.createEmbeddedView(this._templateRef);
        }
    }
}
