import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-indicator-value]',
    standalone: true,
    host: {
        class: 'fd-card__indicator-value'
    }
})
export class CardIndicatorValueDirective {}
