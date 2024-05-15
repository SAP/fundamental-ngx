import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-header-row]',
    standalone: true,
    host: {
        class: 'fd-card__header-row'
    }
})
export class CardHeaderRowDirective {}
