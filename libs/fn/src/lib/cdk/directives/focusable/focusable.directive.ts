import { Directive, Inject, NgModule, Optional } from '@angular/core';
import { FN_FOCUSABLE } from '../../tokens/focusable';
import { FN_DISABLED } from '../../tokens/disabled';
import { FN_READONLY } from '../../tokens/readonly';
import { FocusableBehavior } from '../../common-behaviors/focusable.behavior';
import { DisabledBehavior } from '../../interfaces/DisabledBehavior';
import { ReadonlyBehavior } from '../../interfaces/ReadonlyBehavior';

@Directive({
    selector: '[fnFocusable]',
    providers: [
        {
            provide: FN_FOCUSABLE,
            useExisting: FocusableDirective
        }
    ]
})
export class FocusableDirective extends FocusableBehavior {
    constructor(
        @Optional() @Inject(FN_DISABLED) disabled: DisabledBehavior,
        @Optional() @Inject(FN_READONLY) readonly: ReadonlyBehavior
    ) {
        super(disabled, readonly);
    }
}

@NgModule({
    declarations: [FocusableDirective],
    exports: [FocusableDirective]
})
export class FocusableBehaviorModule {}
