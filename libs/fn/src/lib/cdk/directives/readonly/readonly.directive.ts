import { Directive, HostBinding, Input, NgModule, OnDestroy } from '@angular/core';
import { FN_READONLY } from '../../tokens/readonly';
import { ReplaySubject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ReadonlyBehavior } from '../../interfaces/ReadonlyBehavior';

@Directive({
    selector: '[fnReadonly]',
    providers: [
        {
            provide: FN_READONLY,
            useExisting: ReadonlyDirective
        }
    ]
})
export class ReadonlyDirective extends ReplaySubject<boolean> implements ReadonlyBehavior, OnDestroy {
    @Input()
    @HostBinding('class.is-readonly')
    @HostBinding('readonly')
    set fnReadonly(value: BooleanInput) {
        const isReadonly = coerceBooleanProperty(value);
        if (isReadonly !== this._readonly) {
            this._readonly = isReadonly;
            this.next(isReadonly);
        }
    }

    get fnReadonly(): boolean {
        return this._readonly;
    }

    _readonly = false;

    constructor() {
        super(1);
    }

    ngOnDestroy(): void {
        this.complete();
    }
}

@NgModule({
    declarations: [ReadonlyDirective],
    exports: [ReadonlyDirective]
})
export class ReadonlyBehaviorModule {}
