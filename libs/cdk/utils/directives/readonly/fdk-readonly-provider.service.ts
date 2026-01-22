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
import { DefaultReadonlyViewModifier } from './default-readonly-view-modifier';
import { FDK_READONLY_DIRECTIVE } from './fdk-readonly.token';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { ReadonlyViewModifier } from './readonly-view-modifier.interface';
import { ReadonlyObserver } from './readonly.observer';

@Injectable()
export class FdkReadonlyProvider extends ReplaySubject<boolean> implements ReadonlyBehavior, OnDestroy {
    /** @Hidden */
    fdkReadonly = false;

    /** @hidden */
    private readonly _viewModifiers$: BehaviorSubject<ReadonlyViewModifier[]>;

    /** @hidden */
    private _readonlyChange$: Observable<boolean>;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly readonlyObserver = inject(ReadonlyObserver);

    /** @hidden */
    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef<Element>,
        @Optional() @Self() @Inject(FDK_READONLY_DIRECTIVE) private selfReadonly$: ReadonlyBehavior,
        @Optional() @SkipSelf() @Inject(FDK_READONLY_DIRECTIVE) private parentReadonly$: ReadonlyBehavior
    ) {
        super(1);

        // Initialize properties that depend on injected services
        this._viewModifiers$ = new BehaviorSubject<ReadonlyViewModifier[]>(this._getInitialViewModifiers());
        this._readonlyChange$ = this._getReadonlyChange$();

        combineLatest([this._readonlyChange$, this._viewModifiers$])
            .pipe(
                tap(([isReadonly]) => this.setReadonlyState(isReadonly)),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
        this._readonlyChange$
            .pipe(
                tap((isDisabled) => (this.fdkReadonly = isDisabled)),
                tap((isDisabled) => this.next(isDisabled)),
                takeUntilDestroyed(this._destroyRef)
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
        this.readonlyObserver.unobserve(this.elementRef);
    }

    /** @hidden */
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
                    takeUntilDestroyed(this._destroyRef)
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
                    takeUntilDestroyed(this._destroyRef)
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
