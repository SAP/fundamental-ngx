import { ElementRef, Inject, Injectable, NgZone, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, combineLatest, firstValueFrom } from 'rxjs';
import { distinctUntilChanged, startWith, takeUntil, tap } from 'rxjs/operators';
import { DefaultDisabledViewModifier } from './default-disabled-view-modifier';
import { DisabledBehavior } from './disabled-behavior.interface';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { DisabledObserver } from './disabled.observer';
import { FDK_DISABLED_DIRECTIVE } from './fdk-disabled.token';

@Injectable()
export class FdkDisabledProvider extends ReplaySubject<boolean> implements DisabledBehavior, OnDestroy {
    /** @ignore */
    fdkDisabled = false;
    /** @ignore */
    private readonly _destroy$ = new Subject<void>();
    /** @ignore */
    private readonly _viewModifiers$: BehaviorSubject<DisabledViewModifier[]> = new BehaviorSubject<
        DisabledViewModifier[]
    >(this._getInitialViewModifiers());
    /** @ignore */
    private _disabledChange$: Observable<boolean> = this._getDisabledChange$();

    /** @ignore */
    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef<HTMLElement>,
        private disabledObserver: DisabledObserver,
        @Optional() @Self() @Inject(FDK_DISABLED_DIRECTIVE) private selfDisabled$?: DisabledBehavior,
        @Optional() @SkipSelf() @Inject(FDK_DISABLED_DIRECTIVE) private parentDisabled$?: DisabledBehavior
    ) {
        super(1);
        combineLatest([this._disabledChange$, this._viewModifiers$])
            .pipe(
                tap(([isDisabled]) => this.setDisabledState(isDisabled)),
                takeUntil(this._destroy$)
            )
            .subscribe();
        this._disabledChange$
            .pipe(
                tap((isDisabled) => (this.fdkDisabled = isDisabled)),
                tap((isDisabled) => this.next(isDisabled)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    /** @ignore */
    addViewModifier(modifier: DisabledViewModifier): void {
        const viewModifiers = [...new Set([...this._viewModifiers$.value, modifier]).values()];
        this._viewModifiers$.next(viewModifiers);
    }

    /** @ignore */
    setDisabledState(isDisabled: boolean): void {
        firstValueFrom(this.ngZone.onStable).then(() => {
            this._viewModifiers$.value.forEach((viewModifier) => viewModifier.setDisabledState(isDisabled));
        });
    }

    /** @ignore */
    ngOnDestroy(): void {
        this.complete();
        this._destroy$.next();
        this.disabledObserver.unobserve(this.elementRef);
    }

    /** @ignore */
    private _getDisabledChange$(): Observable<boolean> {
        let selfDisabled = false;
        let parentDisabled = false;

        if (this.parentDisabled$) {
            this.parentDisabled$
                .pipe(
                    startWith(this.parentDisabled$.fdkDisabled),
                    tap((d) => (parentDisabled = d)),
                    distinctUntilChanged(),
                    tap(() => {
                        if (parentDisabled) {
                            this.setDisabledState(true);
                        }
                        if (!selfDisabled && !parentDisabled) {
                            this.setDisabledState(false);
                        }
                    }),
                    takeUntil(this._destroy$)
                )
                .subscribe();
        }
        if (this.selfDisabled$) {
            this.selfDisabled$
                .pipe(
                    startWith(this.selfDisabled$.fdkDisabled),
                    tap((d) => (selfDisabled = d)),
                    distinctUntilChanged(),
                    tap((isDisabled) => {
                        if (!parentDisabled) {
                            this.setDisabledState(isDisabled);
                        }
                    }),
                    takeUntil(this._destroy$)
                )
                .subscribe();
        }
        return this.disabledObserver.observe(this.elementRef).pipe(distinctUntilChanged());
    }

    /** @ignore */
    private _getInitialViewModifiers(): DisabledViewModifier[] {
        return !this.selfDisabled$ ? [new DefaultDisabledViewModifier(this.elementRef)] : [this.selfDisabled$];
    }
}
