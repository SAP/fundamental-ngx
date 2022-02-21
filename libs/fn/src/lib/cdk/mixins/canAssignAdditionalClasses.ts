import { Constructor } from '../interfaces/Constructor';
import { Directive, HostBinding, Input } from '@angular/core';

export interface HasAdditionalClasses {
    class: string;
}

type HasAdditionalClassesConstructor = Constructor<HasAdditionalClasses>;

export function canAssignAdditionalClasses<T extends Constructor<any>>(
    baseClass: T
): T & HasAdditionalClassesConstructor {
    @Directive()
    class CanAssignAdditionalClasses extends baseClass implements HasAdditionalClasses {
        protected _class!: string;
        @Input()
        @HostBinding('class')
        get class(): string {
            return this._class;
        }

        set class(val: string) {
            this._class = val;
        }

        constructor(...args: any[]) {
            super(...args);
        }
    }

    return CanAssignAdditionalClasses;
}
