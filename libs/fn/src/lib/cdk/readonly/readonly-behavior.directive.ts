import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil, tap } from 'rxjs/operators';
import { fnReadonly } from './fn-readonly.token';
import { ReadonlyBehavior } from './readonly-behavior.interface';
import { setReadonlyState } from './set-readonly-state';
import { ReadonlyObserver } from './readonly.observer';
import { DestroyedBehavior } from '../common-behaviors/destroyed-behavior';

@Directive({
    selector: '[fnReadonly]',
    providers: [
        {
            provide: fnReadonly,
            useExisting: ReadonlyBehaviorDirective
        },
        DestroyedBehavior
    ]
})
export class ReadonlyBehaviorDirective
    extends ReplaySubject<boolean>
    implements ReadonlyBehavior, AfterViewInit, OnDestroy
{
    @Input()
    set fnReadonly(value: BooleanInput) {
        this._readonlyInput$.next(coerceBooleanProperty(value));
    }

    get fnReadonly(): boolean {
        return this._readonly;
    }

    _readonly = false;
    _readonlyInput$ = new BehaviorSubject(false);

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _readonlyObserver: ReadonlyObserver,
        private _destroy$: DestroyedBehavior
    ) {
        super(1);
        this._readonlyObserver
            .observe(this._elementRef)
            .pipe(
                tap((isReadonly: boolean) => {
                    if (isReadonly !== this._readonly) {
                        this._readonly = isReadonly;
                        this.next(isReadonly);
                    }
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
        this._readonlyInput$
            .pipe(
                tap((isReadonly) => setReadonlyState(this._elementRef, isReadonly)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
