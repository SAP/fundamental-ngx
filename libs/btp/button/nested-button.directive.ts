import { Directive, Input, OnChanges, booleanAttribute } from '@angular/core';
import { ButtonTypeGuard } from './button-type-guard';

@Directive({
    selector: '[fd-button][fdbNestedButton]',
    standalone: true
})
export class NestedButtonDirective extends ButtonTypeGuard implements OnChanges {
    /** Type of the button. In case of fdbNestedButton it is always a `nested` */
    @Input()
    fdType: 'nested' | 'nested-square' = 'nested' as const;

    /** Whether the button should have squared form */
    @Input({ transform: booleanAttribute })
    square = false;

    /** @hidden */
    ngOnChanges(): void {
        this.fdType = this.square ? 'nested-square' : 'nested';
        super.ngOnChanges();
    }
}
