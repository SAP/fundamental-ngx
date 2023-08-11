import { AfterViewInit, DestroyRef, Directive, ElementRef, Input } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { tap } from 'rxjs/operators';
import { FDK_READONLY_DIRECTIVE } from './fdk-readonly.token';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { setReadonlyState } from './set-readonly-state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    /** @Hidden */
    @Input()
    set fdkReadonly(value: BooleanInput) {
        this._readonlyInput$.next(coerceBooleanProperty(value));
    }

    get fdkReadonly(): boolean {
        return this._readonly;
    }

    /** @Hidden */
    _readonly = false;
    /** @hidden */
    private readonly _readonlyInput$ = new BehaviorSubject(false);

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _destroyRef: DestroyRef) {
        super(1);
        this._destroyRef.onDestroy(() => this.complete());
    }

    /** @Hidden */
    setReadonlyState = (isReadonly: boolean): void => {
        setReadonlyState(this._elementRef, isReadonly);
    };

    /** @hidden */
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
