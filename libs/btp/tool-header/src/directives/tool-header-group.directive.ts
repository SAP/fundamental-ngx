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
    center = false;

    /** @hidden */
    @Input({ transform: booleanAttribute })
    actions = false;

    /** @hidden */
    readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
