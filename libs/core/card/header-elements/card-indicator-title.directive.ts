import { Directive } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-indicator-title]',
    host: {
        class: CLASS_NAME.cardIndicatorTitle
    }
})
export class CardIndicatorTitleDirective {}
