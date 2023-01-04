import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, tap } from 'rxjs/operators';
import { FN_READONLY_DIRECTIVE } from './fn-readonly.token';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { setReadonlyState } from './set-readonly-state';
import { DestroyedService } from '../../services/destroyed.service';

@Directive({
    selector: '[fdReadonly]',
    providers: [
        {
            provide: FN_READONLY_DIRECTIVE,
            useExisting: ReadonlyBehaviorDirective
        },
        DestroyedService
    ]
})
export class ReadonlyBehaviorDirective
    extends ReplaySubject<boolean>
    implements ReadonlyBehavior, AfterViewInit, OnDestroy
{
    /** @Hidden */
    @Input()
    set fdReadonly(value: BooleanInput) {
        this._readonlyInput$.next(coerceBooleanProperty(value));
    }

    get fdReadonly(): boolean {
        return this._readonly;
    }

    /** @Hidden */
    _readonly = false;
    /** @hidden */
    private readonly _readonlyInput$ = new BehaviorSubject(false);

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _destroy$: DestroyedService) {
        super(1);
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
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.complete();
    }
}
