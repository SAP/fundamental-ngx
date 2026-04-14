import { Directive, input } from '@angular/core';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-header-column]',
    host: {
        class: CLASS_NAME.cardHeaderColumn,
        '[class.fd-card__header-column--right-aligned]': 'align() === "right"'
    }
})
export class CardHeaderColumnDirective {
    /**
     * horizontal alignment of the elements inside the column
     * possible options: 'left' | 'right'
     * default: 'left'
     */
    readonly align = input<'left' | 'right'>('left');
}
