import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-indicator-title]',
    standalone: true,
    host: {
        class: 'fd-card__indicator-title'
    }
})
export class CardIndicatorTitleDirective {}
