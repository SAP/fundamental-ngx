import { Directive, ElementRef, Inject, Input, OnDestroy, Optional, Self } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { FN_DISABLED } from '../tokens/disabled';
import { DisabledBehavior } from '../interfaces/disabled-behavior.interface';
import { setDisabledState } from './set-disabled-state';

@Directive({
    selector: '[fnDisabled]',
    providers: [
        {
            provide: FN_DISABLED,
            useExisting: DisabledBehaviorDirective
        }
    ]
})
export class DisabledBehaviorDirective extends ReplaySubject<boolean> implements OnDestroy, DisabledBehavior {
    @Input()
    set fnDisabled(value: BooleanInput) {
        const isDisabled = coerceBooleanProperty(value);
        if (isDisabled !== this._disabled) {
            this._disabled = isDisabled;
            this.next(isDisabled);
            setDisabledState(this._elementRef, isDisabled);
        }
    }

    get fnDisabled(): boolean {
        return this._disabled;
    }

    _disabled = false;

    constructor(
        @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) private valueAccessors: ControlValueAccessor[],
        private _elementRef: ElementRef<HTMLElement>
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
    }

    ngOnDestroy(): void {
        this.complete();
    }
}
