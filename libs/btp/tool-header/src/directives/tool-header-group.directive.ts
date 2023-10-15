import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fdbToolHeaderGroup]',
    host: {
        class: 'fd-tool-header__group',
        '[class.fd-tool-header__group--center]': 'center',
        '[class.fd-tool-header__group--actions]': 'actions'
    },
    standalone: true
})
export class ToolHeaderGroupDirective {
    /** @hidden */
    @Input({ transform: coerceBooleanProperty })
    center: BooleanInput;

    /** @hidden */
    @Input({ transform: coerceBooleanProperty })
    actions: BooleanInput;
}
