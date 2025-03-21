import { Directive } from '@angular/core';

@Directive({
    selector: '[fdListSubline], [fd-list-subline]',
    host: {
        class: 'fd-list__subline'
    },
    standalone: true
})
export class ListSublineDirective {}
