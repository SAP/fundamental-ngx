import { Directive, Input } from '@angular/core';
import { ButtonTypeGuard } from './button-type-guard';

@Directive({
    selector: '[fd-button][fdbNestedButton]',
    standalone: true
})
export class NestedButtonDirective extends ButtonTypeGuard {
    /** Type of the button. In case of fdbNestedButton it is always a `nested` */
    @Input()
    fdType: 'nested' = 'nested' as const;
}
