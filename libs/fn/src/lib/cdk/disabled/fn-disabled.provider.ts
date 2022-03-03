import { ElementRef, Inject, Injectable, NgZone, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { FN_DISABLED_DIRECTIVE } from './fn-disabled.token';
import { DisabledObserver } from './disabled.observer';
import { DisabledBehavior } from './disabled-behavior.interface';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { DefaultDisabledViewModifier } from './default-disabled-view-modifier';

@Injectable()
export class FnDisabledProvider extends ReplaySubject<boolean> implements DisabledBehavior, OnDestroy {
    fnDisabled = false;
    private _destroy$ = new Subject<void>();
    private _viewModifiers$: BehaviorSubject<DisabledViewModifier[]> = new BehaviorSubject<DisabledViewModifier[]>(
        this._getInitialViewModifiers()
    );
    private _disabledChange$: Observable<boolean> = this._getDisabledChange$();

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef<HTMLElement>,
        private disabledObserver: DisabledObserver,
        @Optional() @Self() @Inject(FN_DISABLED_DIRECTIVE) private selfDisabled$?: DisabledBehavior,
        @Optional() @SkipSelf() @Inject(FN_DISABLED_DIRECTIVE) private parentDisabled$?: DisabledBehavior
    ) {
        super(1);
        combineLatest([this._disabledChange$, this._viewModifiers$])
            .pipe(
                tap(([isDisabled, viewModifiers]) =>
                    console.log({ isDisabled, viewModifiers, el: this.elementRef.nativeElement })
                ),
                tap(([isDisabled]) => this.setDisabledState(isDisabled)),
                takeUntil(this._destroy$)
            )
            .subscribe();
        this._disabledChange$
            .pipe(
                tap((isDisabled) => (this.fnDisabled = isDisabled)),
                tap((isDisabled) => this.next(isDisabled)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    addViewModifier(modifier: DisabledViewModifier): void {
        const viewModifiers = [...new Set([...this._viewModifiers$.value, modifier]).values()];
        this._viewModifiers$.next(viewModifiers);
    }

    setDisabledState(isDisabled: boolean): void {
        console.log({ isDisabled });
        firstValueFrom(this.ngZone.onStable).then(() => {
            this._viewModifiers$.value.forEach((viewModifier) => viewModifier.setDisabledState(isDisabled));
        });
    }

    ngOnDestroy(): void {
        this.complete();
        this._destroy$.next();
    }

    private _getDisabledChange$(): Observable<boolean> {
        const self$ = (this.selfDisabled$ || this.disabledObserver.observe(this.elementRef)).pipe(
            startWith(this.fnDisabled)
        );
        const disablingEvents: Observable<boolean>[] = [self$];
        if (this.parentDisabled$) {
            disablingEvents.push(this.parentDisabled$);
        }
        return combineLatest(disablingEvents).pipe(
            map((disabledStates: boolean[]) => disabledStates.some(Boolean)),
            filter((isDisabled) => isDisabled !== this.fnDisabled)
        );
    }

    private _getInitialViewModifiers(): DisabledViewModifier[] {
        return !this.selfDisabled$ ? [new DefaultDisabledViewModifier(this.elementRef)] : [this.selfDisabled$];
    }
}
