import { Directive, ElementRef, OnDestroy, Optional, Provider } from '@angular/core';
import { FN_READONLY, fnReadonly } from './fn-readonly.token';
import { ReadonlyObserver } from './readonly.observer';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { filter, ReplaySubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export const FnReadonlyProvider: Provider = {
    provide: FN_READONLY,
    useFactory: (
        elementRef: ElementRef<Element>,
        readonlyObserver: ReadonlyObserver,
        readonly$: ReadonlyBehavior
    ): ReadonlyBehavior => {
        if (readonly$) {
            return readonly$;
        }

        @Directive()
        class LocalReadonlyObserver extends ReplaySubject<boolean> implements ReadonlyBehavior, OnDestroy {
            fnReadonly = false;
            private _destroy$ = new Subject<void>();

            constructor() {
                super(1);
                readonlyObserver
                    .observe(elementRef)
                    .pipe(
                        filter((isReadonly) => isReadonly !== this.fnReadonly),
                        tap((isReadonly) => (this.fnReadonly = isReadonly)),
                        tap((isReadonly) => this.next(isReadonly)),
                        takeUntil(this._destroy$)
                    )
                    .subscribe();
            }

            ngOnDestroy(): void {
                this._destroy$.next();
            }
        }

        return new LocalReadonlyObserver();
    },
    deps: [ElementRef, ReadonlyObserver, [new Optional(), fnReadonly]]
};
