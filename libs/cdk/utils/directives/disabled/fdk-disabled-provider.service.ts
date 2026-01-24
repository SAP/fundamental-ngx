import {
    DestroyRef,
    ElementRef,
    Inject,
    Injectable,
    NgZone,
    OnDestroy,
    Optional,
    Self,
    SkipSelf,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, ReplaySubject, combineLatest, firstValueFrom } from 'rxjs';
import { distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { DefaultDisabledViewModifier } from './default-disabled-view-modifier';
import { DisabledBehavior } from './disabled-behavior.interface';
import { DisabledViewModifier } from './disabled-view-modifier.interface';
import { DisabledObserver } from './disabled.observer';
import { FDK_DISABLED_DIRECTIVE } from './fdk-disabled.token';

@Injectable()
export class FdkDisabledProvider extends ReplaySubject<boolean> implements DisabledBehavior, OnDestroy {
    /** @Hidden */
    fdkDisabled = false;
    /** @Hidden */
    private readonly _destroyRef = inject(DestroyRef);
    /** @hidden */
    private readonly disabledObserver = inject(DisabledObserver);
    /** @hidden */
    private readonly _viewModifiers$: BehaviorSubject<DisabledViewModifier[]>;
    /** @hidden */
    private _disabledChange$: Observable<boolean>;

    /** @hidden */
    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef<HTMLElement>,
        @Optional() @Self() @Inject(FDK_DISABLED_DIRECTIVE) private selfDisabled$?: DisabledBehavior,
        @Optional() @SkipSelf() @Inject(FDK_DISABLED_DIRECTIVE) private parentDisabled$?: DisabledBehavior
    ) {
        super(1);

        // Initialize properties that depend on injected services
        this._viewModifiers$ = new BehaviorSubject<DisabledViewModifier[]>(this._getInitialViewModifiers());
        this._disabledChange$ = this._getDisabledChange$();
        combineLatest([this._disabledChange$, this._viewModifiers$])
            .pipe(
                tap(([isDisabled]) => this.setDisabledState(isDisabled)),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
        this._disabledChange$
            .pipe(
                tap((isDisabled) => (this.fdkDisabled = isDisabled)),
                tap((isDisabled) => this.next(isDisabled)),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }

    /** @hidden */
    addViewModifier(modifier: DisabledViewModifier): void {
        const viewModifiers = [...new Set([...this._viewModifiers$.value, modifier]).values()];
        this._viewModifiers$.next(viewModifiers);
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        firstValueFrom(this.ngZone.onStable).then(() => {
            this._viewModifiers$.value.forEach((viewModifier) => viewModifier.setDisabledState(isDisabled));
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.complete();
        this.disabledObserver.unobserve(this.elementRef);
    }

    /** @hidden */
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
                    takeUntilDestroyed(this._destroyRef)
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
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe();
        }
        return this.disabledObserver.observe(this.elementRef).pipe(distinctUntilChanged());
    }

    /** @hidden */
    private _getInitialViewModifiers(): DisabledViewModifier[] {
        return !this.selfDisabled$ ? [new DefaultDisabledViewModifier(this.elementRef)] : [this.selfDisabled$];
    }
}
