import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fdbToolHeaderGroup]',
    host: {
        class: 'fd-tool-header__group',
        '[class.fd-tool-header__group--center]': 'center',
        '[class.fd-tool-header__group--actions]': 'actions'
    },
    standalone: true
})
export class ToolHeaderGroupDirective implements HasElementRef {
    /** @ignore */
    @Input({ transform: coerceBooleanProperty })
    center: BooleanInput;

    /** @ignore */
    @Input({ transform: coerceBooleanProperty })
    actions: BooleanInput;

    /** @ignore */
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
