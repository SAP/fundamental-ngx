import { Directive } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-indicator-value]',
    standalone: true,
    host: {
        class: CLASS_NAME.cardIndicatorValue
    }
})
export class CardIndicatorValueDirective {}
