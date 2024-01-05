import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, booleanAttribute, inject } from '@angular/core';
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
    /** @hidden */
    @Input({ transform: booleanAttribute })
    center: BooleanInput;

    /** @hidden */
    @Input({ transform: booleanAttribute })
    actions: BooleanInput;

    /** @hidden */
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
