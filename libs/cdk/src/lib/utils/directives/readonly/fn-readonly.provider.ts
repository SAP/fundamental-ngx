import { ElementRef, Inject, Injectable, NgZone, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs/operators';
import { ReadonlyObserver } from './readonly.observer';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { DefaultReadonlyViewModifier } from './default-readonly-view-modifier';
import { ReadonlyViewModifier } from './readonly-view-modifier.interface';
import { FN_READONLY_DIRECTIVE } from './fn-readonly.token';
import { DestroyedService } from '../../services/destroyed.service';

@Injectable()
export class FnReadonlyProvider extends ReplaySubject<boolean> implements ReadonlyBehavior, OnDestroy {
    /** @Hidden */
    fdReadonly = false;

    /** @hidden */
    private readonly _viewModifiers$: BehaviorSubject<ReadonlyViewModifier[]> = new BehaviorSubject<
        ReadonlyViewModifier[]
    >(this._getInitialViewModifiers());

    /** @hidden */
    private _readonlyChange$: Observable<boolean> = this._getReadonlyChange$();

    /** @hidden */
    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef<Element>,
        private readonlyObserver: ReadonlyObserver,
        private readonly _destroy$: DestroyedService,
        @Optional() @Self() @Inject(FN_READONLY_DIRECTIVE) private selfReadonly$: ReadonlyBehavior,
        @Optional() @SkipSelf() @Inject(FN_READONLY_DIRECTIVE) private parentReadonly$: ReadonlyBehavior
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
                tap((isDisabled) => (this.fdReadonly = isDisabled)),
                tap((isDisabled) => this.next(isDisabled)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    /** @hidden */
    addViewModifier(modifier: ReadonlyViewModifier): void {
        const viewModifiers = [...new Set([...this._viewModifiers$.value, modifier]).values()];
        this._viewModifiers$.next(viewModifiers);
    }

    /** @hidden */
    setReadonlyState(isReadonly: boolean): void {
        firstValueFrom(this.ngZone.onStable).then(() => {
            this._viewModifiers$.value.forEach((viewModifier) => viewModifier.setReadonlyState(isReadonly));
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.complete();
        this._destroy$.next();
        this.readonlyObserver.unobserve(this.elementRef);
    }

    /** @hidden */
    private _getReadonlyChange$(): Observable<boolean> {
        let selfReadonly = false;
        let parentReadonly = false;

        if (this.parentReadonly$) {
            this.parentReadonly$
                .pipe(
                    startWith(this.parentReadonly$.fdReadonly),
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
                    startWith(this.selfReadonly$.fdReadonly),
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

    /** @hidden */
    private _getInitialViewModifiers(): ReadonlyViewModifier[] {
        return !this.selfReadonly$ ? [new DefaultReadonlyViewModifier(this.elementRef)] : [this.selfReadonly$];
    }
}
