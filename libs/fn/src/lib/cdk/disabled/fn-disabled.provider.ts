import { Directive, ElementRef, OnDestroy, Optional, Provider } from '@angular/core';
import { filter, ReplaySubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FN_DISABLED, fnDisabled } from './fn-disabled.token';
import { DisabledObserver } from './disabled.observer';
import { DisabledBehavior } from './disabled-behavior.interface';

export const FnDisabledProvider: Provider = {
    provide: FN_DISABLED,
    useFactory: (
        elementRef: ElementRef<HTMLElement>,
        disabledObserver: DisabledObserver,
        disabled$?: DisabledBehavior
    ): DisabledBehavior => {
        if (disabled$) {
            return disabled$;
        }

        @Directive()
        class LocalDisabledObserver extends ReplaySubject<boolean> implements DisabledBehavior, OnDestroy {
            fnDisabled = false;
            private _destroy$ = new Subject<void>();

            constructor() {
                super(1);
                disabledObserver
                    .observe(elementRef)
                    .pipe(
                        filter((isDisabled) => isDisabled !== this.fnDisabled),
                        tap((isDisabled) => (this.fnDisabled = isDisabled)),
                        tap((isDisabled) => this.next(isDisabled)),
                        takeUntil(this._destroy$)
                    )
                    .subscribe();
            }

            ngOnDestroy(): void {
                this.complete();
                this._destroy$.next();
            }
        }

        return new LocalDisabledObserver();
    },
    deps: [ElementRef, DisabledObserver, [new Optional(), fnDisabled]]
};
