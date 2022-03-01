import { Directive, HostBinding, Inject, Input, NgModule, OnDestroy, Optional, Self } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { FN_DISABLED } from '../../tokens/disabled';
import { DisabledBehavior } from '../../interfaces/disabled-behavior.interface';

@Directive({
    selector: '[fnDisabled]',
    providers: [
        {
            provide: FN_DISABLED,
            useExisting: DisabledDirective
        }
    ]
})
export class DisabledDirective extends ReplaySubject<boolean> implements OnDestroy, DisabledBehavior {
    @Input()
    @HostBinding('class.is-disabled')
    @HostBinding('attr.aria-disabled')
    @HostBinding('disabled')
    set fnDisabled(value: BooleanInput) {
        const isDisabled = coerceBooleanProperty(value);
        if (isDisabled !== this._disabled) {
            this._disabled = isDisabled;
            this.next(isDisabled);
        }
    }

    get fnDisabled(): boolean {
        return this._disabled;
    }

    _disabled = false;

    constructor(@Optional() @Self() @Inject(NG_VALUE_ACCESSOR) private valueAccessors: ControlValueAccessor[]) {
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

@NgModule({
    declarations: [DisabledDirective],
    exports: [DisabledDirective]
})
export class DisabledBehaviorModule {}
