import { Directive, ElementRef, Inject, Input, OnDestroy, Optional, Self } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { FN_DISABLED } from '../tokens/disabled';
import { DisabledBehavior } from '../interfaces/disabled-behavior.interface';
import { setDisabledState } from './set-disabled-state';
import { takeUntil, tap } from 'rxjs/operators';
import { AttributeObserver } from '../observers/attribute.observer';
import { DestroyedBehavior } from '../common-behaviors/destroyed-behavior';

@Directive({
    selector: '[fnDisabled]',
    providers: [
        {
            provide: FN_DISABLED,
            useExisting: DisabledBehaviorDirective
        },
        DestroyedBehavior
    ]
})
export class DisabledBehaviorDirective extends ReplaySubject<boolean> implements OnDestroy, DisabledBehavior {
    @Input()
    set fnDisabled(value: BooleanInput) {
        setDisabledState(this._elementRef, coerceBooleanProperty(value));
    }

    get fnDisabled(): boolean {
        return this._disabled;
    }

    _disabled = false;

    constructor(
        @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) private valueAccessors: ControlValueAccessor[],
        private _elementRef: ElementRef<HTMLElement>,
        private _contentObserver: AttributeObserver,
        private _destroy$: DestroyedBehavior
    ) {
        super(1);

        if (valueAccessors?.length > 0) {
            for (const valueAccessor of valueAccessors) {
                const originalSetDisabledState = valueAccessor.setDisabledState;
                valueAccessor.setDisabledState = (isDisabled: boolean) => {
                    if (originalSetDisabledState) {
                        originalSetDisabledState.call(valueAccessor, isDisabled);
                    }
                    this.fnDisabled = isDisabled;
                };
            }
        }

        _contentObserver
            .observe(this._elementRef)
            .pipe(
                tap(() => {
                    const isDisabled = this.isDisabled(this._elementRef.nativeElement);
                    if (isDisabled !== this._disabled) {
                        this._disabled = isDisabled;
                        this.next(isDisabled);
                    }
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    isDisabled(el: Element): boolean {
        return (
            el.hasAttribute('disabled') ||
            el.getAttribute('aria-disabled') === 'true' ||
            el.classList.contains('is-disabled')
        );
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
