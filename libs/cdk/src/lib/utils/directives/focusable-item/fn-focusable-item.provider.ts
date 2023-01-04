import { ElementRef, Inject, Injectable, NgZone, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, Observable, ReplaySubject } from 'rxjs';
import { FocusableItemViewModifier } from './focusable-item-view-modifier.interface';
import { FN_FOCUSABLE_ITEM_DIRECTIVE } from './focusable.tokens';
import { FocusableItemDirective } from './focusable-item.directive';
import { FocusableObserver } from './focusable.observer';
import { DefaultFocusableItemViewModifier } from './default-focusable-item-view-modifier';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { DestroyedService } from '../../services/destroyed.service';

@Injectable()
export class FnFocusableItemProvider extends ReplaySubject<boolean> implements FocusableItemViewModifier, OnDestroy {
    /** @hidden */
    focusable = true;
    /** @hidden */
    private readonly _viewModifiers$: BehaviorSubject<FocusableItemViewModifier[]> = new BehaviorSubject<
        FocusableItemViewModifier[]
    >(this._getInitialViewModifiers());
    /** @hidden */
    private readonly _focusableChange$: Observable<boolean> = this._getFocusableChange$();

    /** @hidden */
    private _focusableObserver$!: Observable<boolean>;

    /** @hidden */
    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef<HTMLElement>,
        private focusableObserver: FocusableObserver,
        private readonly _destroy$: DestroyedService,
        @Optional() @Self() @Inject(FN_FOCUSABLE_ITEM_DIRECTIVE) private selfFocusable$?: FocusableItemDirective,
        @Optional() @SkipSelf() @Inject(FN_FOCUSABLE_ITEM_DIRECTIVE) private parentFocusable$?: FocusableItemDirective
    ) {
        super(1);
        combineLatest([this._focusableChange$, this._viewModifiers$])
            .pipe(
                tap(([isFocusable]) => this.setFocusable(isFocusable)),
                takeUntil(this._destroy$)
            )
            .subscribe();
        this._focusableChange$
            .pipe(
                tap((isFocusable) => (this.focusable = isFocusable)),
                tap((isFocusable) => this.next(isFocusable)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroy$.next();
        this.complete();
        if (this._focusableObserver$) {
            this.focusableObserver.unobserve(this.elementRef);
        }
    }

    /**
     * Adds view modifier
     * @param modifier
     */
    addViewModifier(modifier: FocusableItemViewModifier): void {
        const viewModifiers = [...new Set([...this._viewModifiers$.value, modifier]).values()];
        this._viewModifiers$.next(viewModifiers);
    }

    /**
     * Sets focusable state of the element.
     * @param isReadonly
     */
    setFocusable(isReadonly: boolean): void {
        firstValueFrom(this.ngZone.onStable).then(() => {
            this._viewModifiers$.value.forEach((viewModifier) => viewModifier.setFocusable(isReadonly));
        });
    }

    /** @hidden */
    private _getInitialViewModifiers(): FocusableItemViewModifier[] {
        return !this.selfFocusable$ ? [new DefaultFocusableItemViewModifier(this.elementRef)] : [this.selfFocusable$];
    }

    /** @hidden */
    private _getFocusableChange$(): Observable<boolean> {
        if (!this.selfFocusable$) {
            this._focusableObserver$ = this.focusableObserver.observe(this.elementRef);
        }
        const self$ = (this.selfFocusable$ || this._focusableObserver$).pipe(startWith(this.focusable));
        const disablingEvents: Observable<boolean>[] = [self$];
        if (this.parentFocusable$) {
            disablingEvents.push(this.parentFocusable$);
        }
        return combineLatest(disablingEvents).pipe(
            map((focusableStates: boolean[]) => focusableStates.some(Boolean)),
            filter((isFocusable) => isFocusable !== this.focusable)
        );
    }
}
