import { Constructor } from '../interfaces/Constructor';
import { Directive, HostBinding, Input } from '@angular/core';
import { CanBeDisabledConstructor } from './canBeDisabled';

export interface HasTabIndex {
    tabindex: string | number;
}

type HasTabIndexConstructor = Constructor<HasTabIndex>;

export function hasTabIndex<T extends CanBeDisabledConstructor>(
    baseClass: T,
    defaultTabIndex = 0
): T & HasTabIndexConstructor {
    @Directive()
    class HasTabIndexClass extends baseClass implements HasTabIndex {
        private _tabIndex: string | number = defaultTabIndex;

        @Input()
        @HostBinding('attr.tabindex')
        get tabindex(): string | number {
            return this.disabled ? -1 : this._tabIndex;
        }

        set tabindex(value: string | number) {
            this._tabIndex = value != null ? value : defaultTabIndex;
        }

        constructor(...args: any[]) {
            super(...args);
        }
    }

    return HasTabIndexClass;
}
