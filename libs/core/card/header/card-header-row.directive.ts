import { Directive } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-header-row]',
    host: {
        class: CLASS_NAME.cardHeaderRow
    }
})
export class CardHeaderRowDirective {}
