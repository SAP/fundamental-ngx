import { ElementRef, Inject, Injectable, NgZone, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, combineLatest, firstValueFrom } from 'rxjs';
import { distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs/operators';
import { DefaultReadonlyViewModifier } from './default-readonly-view-modifier';
import { FDK_READONLY_DIRECTIVE } from './fdk-readonly.token';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { ReadonlyViewModifier } from './readonly-view-modifier.interface';
import { ReadonlyObserver } from './readonly.observer';

@Injectable()
export class FdkReadonlyProvider extends ReplaySubject<boolean> implements ReadonlyBehavior, OnDestroy {
    /** @ignore */
    fdkReadonly = false;

    /** @ignore */
    private readonly _viewModifiers$: BehaviorSubject<ReadonlyViewModifier[]> = new BehaviorSubject<
        ReadonlyViewModifier[]
    >(this._getInitialViewModifiers());

    /** @ignore */
    private _readonlyChange$: Observable<boolean> = this._getReadonlyChange$();

    /** @ignore */
    private readonly _destroy$ = new Subject<void>();

    /** @ignore */
    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef<Element>,
        private readonlyObserver: ReadonlyObserver,
        @Optional() @Self() @Inject(FDK_READONLY_DIRECTIVE) private selfReadonly$: ReadonlyBehavior,
        @Optional() @SkipSelf() @Inject(FDK_READONLY_DIRECTIVE) private parentReadonly$: ReadonlyBehavior
    ) {
        super(1);
        combineLatest([this._readonlyChange$, this._viewModifiers$])
            .pipe(
                tap(([isReadonly]) => this.setReadonlyState(isReadonly)),
                takeUntil(this._destroy$)
            )
            .subscribe();
        this._readonlyChange$
            .pipe(
                tap((isDisabled) => (this.fdkReadonly = isDisabled)),
                tap((isDisabled) => this.next(isDisabled)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    /** @ignore */
    addViewModifier(modifier: ReadonlyViewModifier): void {
        const viewModifiers = [...new Set([...this._viewModifiers$.value, modifier]).values()];
        this._viewModifiers$.next(viewModifiers);
    }

    /** @ignore */
    setReadonlyState(isReadonly: boolean): void {
        firstValueFrom(this.ngZone.onStable).then(() => {
            this._viewModifiers$.value.forEach((viewModifier) => viewModifier.setReadonlyState(isReadonly));
        });
    }

    /** @ignore */
    ngOnDestroy(): void {
        this.complete();
        this._destroy$.next();
        this._destroy$.complete();
        this.readonlyObserver.unobserve(this.elementRef);
    }

    /** @ignore */
    private _getReadonlyChange$(): Observable<boolean> {
        let selfReadonly = false;
        let parentReadonly = false;

        if (this.parentReadonly$) {
            this.parentReadonly$
                .pipe(
                    startWith(this.parentReadonly$.fdkReadonly),
                    tap((d) => (parentReadonly = d)),
                    distinctUntilChanged(),
                    tap(() => {
                        if (parentReadonly) {
                            this.setReadonlyState(true);
                        }
                        if (!selfReadonly && !parentReadonly) {
                            this.setReadonlyState(false);
                        }
                    }),
                    takeUntil(this._destroy$)
                )
                .subscribe();
        }
        if (this.selfReadonly$) {
            this.selfReadonly$
                .pipe(
                    startWith(this.selfReadonly$.fdkReadonly),
                    tap((d) => (selfReadonly = d)),
                    distinctUntilChanged(),
                    tap((isReadonly) => {
                        if (!parentReadonly) {
                            this.setReadonlyState(isReadonly);
                        }
                    }),
                    takeUntil(this._destroy$)
                )
                .subscribe();
        }
        return this.readonlyObserver.observe(this.elementRef).pipe(distinctUntilChanged());
    }

    /** @ignore */
    private _getInitialViewModifiers(): ReadonlyViewModifier[] {
        return !this.selfReadonly$ ? [new DefaultReadonlyViewModifier(this.elementRef)] : [this.selfReadonly$];
    }
}
