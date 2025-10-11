import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
    selector: '[fdListSubline], [fd-list-subline]',
    host: {
        class: 'fd-list__subline',
        '[class.fd-list__subline--truncate]': 'truncate()'
    },
    standalone: true
})
export class ListSublineDirective {
    /** Whether the text should truncate with ellipsis. */
    truncate = input(false, { transform: booleanAttribute });
}
