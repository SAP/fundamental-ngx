import { Constructor } from '../interfaces/Constructor';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding } from '@angular/core';

export interface CanBeDisabled {
    disabled: boolean;
}

export type CanBeDisabledConstructor = Constructor<CanBeDisabled>;

export function canBeDisabled<T extends Constructor<any>>(base: T): T & CanBeDisabledConstructor {
    @Directive()
    class CanBeDisabledClass extends base {
        protected _disabled = false;

        @HostBinding('disabled')
        @HostBinding('class.is-disabled')
        @HostBinding('attr.aria-disabled')
        get disabled(): boolean {
            return this._disabled;
        }

        set disabled(isDisabled: any) {
            this._disabled = coerceBooleanProperty(isDisabled);
            console.log(this._disabled);
        }
    }

    return CanBeDisabledClass;
}
