import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, DestroyRef, Directive, ElementRef, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FDK_READONLY_DIRECTIVE } from './fdk-readonly.token';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { setReadonlyState } from './set-readonly-state';

@Directive({
    selector: '[fdkReadonly]',
    standalone: true,
    providers: [
        {
            provide: FDK_READONLY_DIRECTIVE,
            useExisting: ReadonlyBehaviorDirective
        }
    ]
})
export class ReadonlyBehaviorDirective extends ReplaySubject<boolean> implements ReadonlyBehavior, AfterViewInit {
    /** @ignore */
    @Input()
    set fdkReadonly(value: BooleanInput) {
        this._readonlyInput$.next(coerceBooleanProperty(value));
    }

    get fdkReadonly(): boolean {
        return this._readonly;
    }

    /** @ignore */
    _readonly = false;
    /** @ignore */
    private readonly _readonlyInput$ = new BehaviorSubject(false);

    /** @ignore */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _destroyRef: DestroyRef
    ) {
        super(1);
        this._destroyRef.onDestroy(() => this.complete());
    }

    /** @ignore */
    setReadonlyState = (isReadonly: boolean): void => {
        setReadonlyState(this._elementRef, isReadonly);
    };

    /** @ignore */
    ngAfterViewInit(): void {
        this._readonlyInput$
            .pipe(
                tap((isReadonly) => {
                    if (isReadonly !== this._readonly) {
                        this.setReadonlyState(isReadonly);
                        this._readonly = isReadonly;
                        this.next(isReadonly);
                    }
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }
}
