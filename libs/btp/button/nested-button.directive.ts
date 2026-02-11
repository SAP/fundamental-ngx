import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core/button';
import { ButtonTypeGuard } from './button-type-guard';

@Directive({
    selector: '[fd-button][fdbNestedButton]'
})
export class NestedButtonDirective extends ButtonTypeGuard {
    /** Whether the button should have squared form */
    readonly square = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    /** Type of the button. In case of fdbNestedButton it is always `nested` or `nested-square` based on square input */
    readonly fdType = computed(() => (this.square() ? 'nested-square' : 'nested') as ButtonType);
}
