import {
    ChangeDetectorRef,
    Directive,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { getChangesSource$ } from '../helpers/get-changes-source';
import { SkeletonService } from '../public-api';
import { SKELETON_DIRECTIVE } from '../tokens/skeleton-directive.token';
import { SkeletonDirective } from './skeleton.directive';

/** Directive to listen to the skeleton state that set above (via directive or service) and render skeleton template. */
@Directive({
    selector: '[fdSkeletonTemplate]'
})
export class SkeletonTemplateDirective implements OnInit, OnDestroy {
    /** Skeleton template to render when the skeleton state is true. */
    @Input()
    fdSkeletonTemplate: TemplateRef<any>;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    constructor(
        @Inject(SKELETON_DIRECTIVE) @Optional() private readonly _parentSkeletonDirective: SkeletonDirective,
        @Optional() private readonly _skeletonService: SkeletonService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _templateRef: TemplateRef<any>,
        private readonly _vcr: ViewContainerRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        getChangesSource$(this._parentSkeletonDirective, this._skeletonService)
            .pipe(distinctUntilChanged(), takeUntil(this._onDestroy$))
            .subscribe((loadingState) => this._updateView(loadingState));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    /** @hidden */
    _updateView(loadingState: boolean): void {
        this._vcr.clear();

        if (loadingState && this.fdSkeletonTemplate) {
            this._vcr.createEmbeddedView(this.fdSkeletonTemplate);
        } else if (this._templateRef) {
            this._vcr.createEmbeddedView(this._templateRef);
        }

        if (!this._parentSkeletonDirective) {
            this._cdr.markForCheck();
        }
    }
}
