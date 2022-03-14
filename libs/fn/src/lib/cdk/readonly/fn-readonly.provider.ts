import { ElementRef, Inject, Injectable, NgZone, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs/operators';
import { ReadonlyObserver } from './readonly.observer';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { DefaultReadonlyViewModifier } from './default-readonly-view-modifier';
import { ReadonlyViewModifier } from './readonly-view-modifier.interface';
import { FN_READONLY_DIRECTIVE } from './fn-readonly.token';

@Injectable()
export class FnReadonlyProvider extends ReplaySubject<boolean> implements ReadonlyBehavior, OnDestroy {
    fnReadonly = false;
    private _destroy$ = new Subject<void>();
    private _viewModifiers$: BehaviorSubject<ReadonlyViewModifier[]> = new BehaviorSubject<ReadonlyViewModifier[]>(
        this._getInitialViewModifiers()
    );
    private _readonlyChange$: Observable<boolean> = this._getReadonlyChange$();

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef<Element>,
        private readonlyObserver: ReadonlyObserver,
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
                tap((isDisabled) => (this.fnReadonly = isDisabled)),
                tap((isDisabled) => this.next(isDisabled)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    addViewModifier(modifier: ReadonlyViewModifier): void {
        const viewModifiers = [...new Set([...this._viewModifiers$.value, modifier]).values()];
        this._viewModifiers$.next(viewModifiers);
    }

    setReadonlyState(isReadonly: boolean): void {
        firstValueFrom(this.ngZone.onStable).then(() => {
            this._viewModifiers$.value.forEach((viewModifier) => viewModifier.setReadonlyState(isReadonly));
        });
    }

    ngOnDestroy(): void {
        this.complete();
        this._destroy$.next();
        this.readonlyObserver.unobserve(this.elementRef);
    }

    private _getReadonlyChange$(): Observable<boolean> {
        let selfReadonly = false;
        let parentReadonly = false;

        if (this.parentReadonly$) {
            this.parentReadonly$
                .pipe(
                    startWith(this.parentReadonly$.fnReadonly),
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
                    startWith(this.selfReadonly$.fnReadonly),
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

    private _getInitialViewModifiers(): ReadonlyViewModifier[] {
        return !this.selfReadonly$ ? [new DefaultReadonlyViewModifier(this.elementRef)] : [this.selfReadonly$];
    }
}
