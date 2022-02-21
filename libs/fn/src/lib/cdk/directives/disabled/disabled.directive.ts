import { Directive, HostBinding, Input, NgModule, OnDestroy } from '@angular/core';
import { FN_DISABLED } from '../../tokens/disabled';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ReplaySubject } from 'rxjs';
import { DisabledBehavior } from '../../interfaces/DisabledBehavior';

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
        const isReadonly = coerceBooleanProperty(value);
        if (isReadonly !== this._disabled) {
            this._disabled = isReadonly;
            this.next(isReadonly);
        }
    }

    get fnDisabled(): boolean {
        return this._disabled;
    }

    _disabled = false;

    constructor() {
        super(1);
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
