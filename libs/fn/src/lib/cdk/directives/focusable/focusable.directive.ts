import { Directive, HostBinding, Inject, Input, NgModule, Optional } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FN_FOCUSABLE } from '../../tokens/focusable';
import { FN_DISABLED } from '../../tokens/disabled';
import { FN_READONLY } from '../../tokens/readonly';
import { BaseFocusableBehavior } from '../../common-behaviors/base-focusable-behavior';
import { DisabledBehavior } from '../../interfaces/DisabledBehavior';
import { ReadonlyBehavior } from '../../interfaces/ReadonlyBehavior';
import { DestroyedBehavior } from '../../common-behaviors/destroyed-behavior';

@Directive({
    selector: '[fnFocusable]',
    providers: [
        {
            provide: FN_FOCUSABLE,
            useExisting: FocusableDirective
        },
        DestroyedBehavior
    ]
})
export class FocusableDirective extends ReplaySubject<boolean> {
    @Input()
    set fnFocusable(val: BooleanInput) {
        const isFocusable = coerceBooleanProperty(val);
        if (isFocusable !== this.baseFocusableInstance.focusable) {
            this.baseFocusableInstance.focusable = isFocusable;
            this.next(isFocusable);
        }
    }

    get fnFocusable(): boolean {
        return this.baseFocusableInstance.focusable;
    }

    @HostBinding('attr.tabindex')
    tabIndex = 0;

    private baseFocusableInstance: BaseFocusableBehavior;

    constructor(
        destroy$: DestroyedBehavior,
        @Optional() @Inject(FN_DISABLED) disabled$: DisabledBehavior,
        @Optional() @Inject(FN_READONLY) readonly$: ReadonlyBehavior
    ) {
        super(1);
        this.baseFocusableInstance = new BaseFocusableBehavior(disabled$, readonly$);
        this.baseFocusableInstance.focusable$.pipe(takeUntil(destroy$)).subscribe((isFocusable) => {
            this.tabIndex = isFocusable ? 0 : -1;
        });
        destroy$.subscribe(() => this.complete());
    }
}

@NgModule({
    declarations: [FocusableDirective],
    exports: [FocusableDirective]
})
export class FocusableBehaviorModule {}
